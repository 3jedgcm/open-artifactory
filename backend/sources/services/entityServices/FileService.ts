import { QueryRunner } from 'typeorm'
import fs from 'fs'
import { v4 } from 'uuid'
import * as crypto from 'crypto'
import { check } from 'diskusage'
import path from 'path'
import fastFolderSizeSync from 'fast-folder-size/sync'
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

      const files = await repository.files.find()
      files.filter((file) => {
        if (!fs.existsSync(file.path)) {
          repository.files.remove(file)
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

    throw new OpenArtifactoryError(404, `${uuid} file not found`)
  }

  /**
   * Creates new file entity and uploads file
   * @param uploadedFile Multer file to upload
   * @param name optional file name, if not set, original name is used
   * @return {@link File} uploaded file entity
   * @throws {@link OpenArtifactoryError} if an error occur during upload
   */
  public static async upload(uploadedFile: Express.Multer.File, name?: string): Promise<File> {
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

      queryRunner = datasource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()

      fileEntity = await repository.files.save(fileEntity)

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
      fileEntity = await repository.files.save(fileEntity)

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

    await repository.files.remove(fileEntity)
    return fileEntity
  }

  /**
   * Updates file entity
   * @param uuid Updated file uuid
   * @param updatedFile new file data to set
   * @return {@link File} Updated file entity
   * @throws {@link OpenArtifactoryError} if uuid does not exist in database
   */
  public static async update(uuid: string, updatedFile: File): Promise<File> {
    let fileEntity = await this.get(uuid)

    fileEntity.name = updatedFile.name
    fileEntity = await repository.files.save(fileEntity)

    return fileEntity
  }

  /**
   * Computes storage sizes and return values
   * @return {@link StorageHttpEntity} with disk data
   */
  public static async getStorageData(): Promise<StorageHttpEntity> {
    const storagePath = path.resolve(constants.filesFolderPath)

    if (!fs.existsSync(storagePath) || !fs.lstatSync(storagePath)
      .isDirectory()) {
      fs.mkdirSync(storagePath, { recursive: true })
    }

    const pathUsage = await check(storagePath)
    const usedSpace = fastFolderSizeSync(storagePath)

    console.log(constants.storageLimit)

    if (usedSpace) {
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
