import { QueryRunner } from 'typeorm'
import fs from 'fs'
import { v4 } from 'uuid'
import * as crypto from 'crypto'
import diskusage from 'diskusage-ng'
import path from 'path'
import getFolderSize from 'get-folder-size'
import File from '../../model/entities/File'
import repository from '../datasource/repository'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'
import datasource from '../datasource'
import { Uuid } from '../../model/httpEntites/primitivesHttpEnties'
import constants from '../../constants'
import StorageHttpEntity from '../../model/httpEntites/StorageHttpEntity'

/**
 * Service to manage file entities
 */
export default class FileService {
  /**
   * Gets file entity list
   * Remove deleted files for list before return
   * @return {@link File}[] File entity array
   */
  public static async getList(): Promise<File[]> {
    let queryRunner!: QueryRunner
    try {
      queryRunner = datasource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()

      const files = await queryRunner.manager.find(File)
      files.filter((file) => {
        if (!fs.existsSync(file.path)) {
          queryRunner.manager.remove(file)
          return false
        }
        return true
      })
      await queryRunner.commitTransaction()

      return files
    } catch (error) {
      if (queryRunner && queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction()
      }
      throw error
    } finally {
      if (queryRunner) {
        await queryRunner.release()
      }
    }
  }

  /**
   * Gets file entity by uuid
   * @param uuid selected file uuid
   * @param incrementDownloadCount set true to increment download counter, default false
   * @return {@link File} selected file entity
   * @throws {@link OpenArtifactoryError} if uuid does not exist in database
   */
  public static async get(uuid: Uuid, incrementDownloadCount = false): Promise<File> {
    const fileEntity = await repository.files.findOneBy({ uuid })

    if (fileEntity) {
      if (fs.existsSync(fileEntity.path)) {
        if (incrementDownloadCount) {
          fileEntity.downloadCount += 1
          await repository.files.save(fileEntity)
        }
        return fileEntity
      }

      // Cleaning db if file not found
      await repository.files.remove(fileEntity)
    }

    throw new OpenArtifactoryError(404, `${uuid} not found`)
  }

  /**
   * Creates new file entity and uploads file
   * @param uploadedFile Multer file to upload
   * @param name optional file name, if not set, original name is used
   * @param comment optional file comment
   * @return {@link File} uploaded file entity
   * @throws {@link OpenArtifactoryError} if an error occur during upload
   */
  public static async upload(
    uploadedFile: Express.Multer.File,
    name?: string,
    comment?: string
  ): Promise<File> {
    let fileEntity: File
    let queryRunner!: QueryRunner

    const storageData = await this.getStorageData()

    if (storageData.availableSpace < uploadedFile.size) {
      throw new OpenArtifactoryError(500, 'Disk space not available')
    }

    try {
      fileEntity = repository.files.create()
      fileEntity.size = uploadedFile.size
      fileEntity.mimeType = uploadedFile.mimetype
      fileEntity.hash = crypto.createHash('md5')
        .update(uploadedFile.buffer)
        .digest('hex')

      fileEntity.name = name ?? uploadedFile.originalname
      fileEntity.comment = comment && comment.trim().length > 0 ? comment : null

      queryRunner = datasource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()

      fileEntity = await queryRunner.manager.save(fileEntity)

      if (!fs.existsSync(constants.filesFolderPath)) {
        fs.mkdirSync(constants.filesFolderPath)
      }
      fs.writeFileSync(fileEntity.path, uploadedFile.buffer)

      await queryRunner.commitTransaction()
    } catch (error) {
      if (queryRunner && queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction()
      }

      throw new OpenArtifactoryError(
        500,
        'An errors occur during file upload',
        error
      )
    } finally {
      if (queryRunner) {
        await queryRunner.release()
      }
    }

    return fileEntity
  }

  /**
   * Changes file uuid
   * @param uuid selected file uuid
   * @return {@link File} updated file entity
   * @throws {@link OpenArtifactoryError} if an error occur
   */
  public static async changeUuid(uuid: Uuid): Promise<File> {
    let fileEntity = await this.get(uuid)
    let queryRunner!: QueryRunner

    try {
      queryRunner = datasource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()

      const oldPath = fileEntity.path
      fileEntity.uuid = v4()
      fileEntity = await queryRunner.manager.save(fileEntity)

      fs.renameSync(oldPath, fileEntity.path)
      await queryRunner.commitTransaction()
    } catch (error) {
      if (queryRunner && queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction()
      }

      throw new OpenArtifactoryError(
        500,
        'An errors occur during uuid change',
        error
      )
    } finally {
      if (queryRunner) {
        await queryRunner.release()
      }
    }

    return fileEntity
  }

  /**
   * Deletes file entity
   * @param uuid deleted file uuid
   * @return {@link File} deleted file entity
   * @throws {@link OpenArtifactoryError} if uuid does not exist in database
   */
  public static async delete(uuid: Uuid): Promise<File> {
    const fileEntity = await this.get(uuid)

    if (fs.existsSync(fileEntity.path)) {
      fs.unlinkSync(fileEntity.path)
    }

    return repository.files.remove(fileEntity)
  }

  /**
   * Updates file entity
   * @param updatedFile new file data to set
   * @return {@link File} Updated file entity
   * @throws {@link OpenArtifactoryError} if uuid does not exist in database
   */
  public static async update(updatedFile: File): Promise<File> {
    const fileEntity = await this.get(updatedFile.uuid)

    fileEntity.name = updatedFile.name
    fileEntity.comment = updatedFile.comment

    return repository.files.save(fileEntity)
  }

  /**
   * Computes storage sizes and return values
   * @return {@link StorageHttpEntity} with disk data
   */
  public static async getStorageData(): Promise<StorageHttpEntity> {
    type Usage = { readonly total: number, readonly used: number, readonly available: number }

    const storagePath = path.resolve(constants.filesFolderPath)

    if (!fs.existsSync(storagePath) || !fs.lstatSync(storagePath)
      .isDirectory()) {
      fs.mkdirSync(storagePath, { recursive: true })
    }

    const pathUsage: Usage = await new Promise((resolve, reject) => {
      diskusage(storagePath, (error, usage) => {
        if (error) {
          reject(error)
        }
        resolve(usage)
      })
    })

    const usedSpace: number = await new Promise((resolve, reject) => {
      getFolderSize(storagePath, (error, usage) => {
        if (error) {
          reject(error)
        }
        resolve(usage)
      })
    })

    if (usedSpace || usedSpace === 0) {
      const totalSpace = constants.storageLimit > 0
        ? Math.min(constants.storageLimit, pathUsage.available + usedSpace)
        : pathUsage.available + usedSpace
      const availableSpace = totalSpace - usedSpace

      return {
        availableSpace,
        totalSpace,
        usedSpace,
        storagePath
      }
    }

    throw new Error('Error during read folder size')
  }
}
