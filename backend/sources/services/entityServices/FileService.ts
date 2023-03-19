import { Repository } from 'typeorm'
import fs from 'fs'
import { v4 } from 'uuid'
import * as crypto from 'crypto'
import diskusage from 'diskusage-ng'
import path from 'path'
import getFolderSize from 'get-folder-size'
import File from '../../model/entities/File'
import repository from '../dataSource/repository'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'
import { Uuid } from '../../model/httpEntites/primitivesHttpEnties'
import constants from '../../constants'
import StorageHttpEntity from '../../model/httpEntites/file/StorageHttpEntity'
import GroupService from './GroupService'
import Badge from '../../model/entities/Badge'
import BadgeService from './BadgeService'
import Group from '../../model/entities/Group'

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
    return repository.executeTransaction(async (entityManager) => {
      const fileRepository = entityManager.getRepository(File)

      const files = await fileRepository.find({
        relations: {
          badges: true,
          group: true
        }
      })

      return files.filter((file) => {
        if (!fs.existsSync(file.path)) {
          fileRepository.remove(file)
          return false
        }
        return true
      })
    })
  }

  /**
   * Gets file for download endpoint
   * Increment file download counter
   * @param uuid selected file uuid
   * @throws {@link OpenArtifactoryError} if uuid does not exist in database
   */
  public static async download(uuid: Uuid) {
    return repository.executeTransaction(async (entityManager) => this.get(
      uuid,
      entityManager.getRepository(File),
      true,
      false
    ))
  }

  /**
   * Creates new file entity and uploads file
   * @param uploadedFile Multer file to upload
   * @param toCreate file metaData to upload
   * @return {@link File} uploaded file entity
   * @throws {@link OpenArtifactoryError} if an error occurs during upload
   */
  public static async upload(
    uploadedFile: Express.Multer.File,
    toCreate: File
  ): Promise<File> {
    const storageData = await this.getStorageData()

    if (storageData.availableSpace < uploadedFile.size) {
      throw new Error('Not enough storage space')
    }

    return repository.executeTransaction(async (entityManager) => {
      const fileRepository = entityManager.getRepository(File)

      let fileEntity = fileRepository.create()
      fileEntity.size = uploadedFile.size
      fileEntity.mimeType = uploadedFile.mimetype
      fileEntity.hash = crypto.createHash('md5')
        .update(uploadedFile.buffer)
        .digest('hex')

      fileEntity.name = toCreate.name
      fileEntity.comment = toCreate.comment

      fileEntity.group = toCreate.group
        ? await GroupService.get(toCreate.group.id, entityManager.getRepository(Group)) : null
      fileEntity.badges = toCreate.badges && toCreate.badges.length > 0
        ? await BadgeService.getListById(
          toCreate.badges.map((badge) => badge.id),
          entityManager.getRepository(Badge)
        ) : []

      fileEntity = await fileRepository.save(fileEntity)

      if (!fs.existsSync(constants.filesFolderPath)) {
        fs.mkdirSync(constants.filesFolderPath)
      }
      fs.writeFileSync(fileEntity.path, uploadedFile.buffer)

      return fileEntity
    })
  }

  /**
   * Changes file uuid
   * @param uuid selected file uuid
   * @return {@link File} updated file entity
   * @throws {@link OpenArtifactoryError} if an error occurs
   */
  public static async changeUuid(uuid: Uuid): Promise<File> {
    return repository.executeTransaction(async (entityManager) => {
      const fileRepository = entityManager.getRepository(File)
      let fileEntity = await this.get(uuid, fileRepository)

      const oldPath = fileEntity.path
      fileEntity.uuid = v4()

      fileEntity = await fileRepository.save(fileEntity)
      fs.renameSync(oldPath, fileEntity.path)
      return fileEntity
    })
  }

  /**
   * Updates file entity
   * @param toUpdate new file data to set
   * @return {@link File} Updated file entity
   * @throws {@link OpenArtifactoryError} if uuid, group or badge does not exist in database
   * or groupId/BadgeId not found
   */
  public static async update(toUpdate: File): Promise<File> {
    return repository.executeTransaction(async (entityManager) => {
      const fileRepository = entityManager.getRepository(File)
      const fileEntity = await this.get(toUpdate.uuid, fileRepository, false, true)

      fileEntity.name = toUpdate.name
      fileEntity.comment = toUpdate.comment
      fileEntity.group = toUpdate.group
        ? await GroupService.get(toUpdate.group.id, entityManager.getRepository(Group)) : null
      fileEntity.badges = toUpdate.badges.length > 0
        ? await BadgeService.getListById(
          toUpdate.badges.map((badge) => badge.id),
          entityManager.getRepository(Badge)
        ) : []

      return fileRepository.save(fileEntity)
    })
  }

  /**
   * Deletes file entity
   * @param uuid deleted file uuid
   * @return {@link File} deleted file entity
   * @throws {@link OpenArtifactoryError} if uuid does not exist in database
   */
  public static async delete(uuid: Uuid): Promise<File> {
    return repository.executeTransaction(async (entityManager) => {
      const fileRepository = entityManager.getRepository(File)
      const fileEntity = await this.get(uuid, fileRepository, false, true)

      if (fs.existsSync(fileEntity.path)) {
        fs.unlinkSync(fileEntity.path)
      }
      await fileRepository.remove(fileEntity)

      return fileEntity
    })
  }

  /**
   * Computes storage sizes and return values
   * @return {@link StorageHttpEntity} with disk data
   * @throws {@link Error} if an error occurs during folder size reading
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

    throw new Error('Error occurred while reading folder size')
  }

  /**
   * Gets file entity by uuid
   * Should be call in a transaction (see repository.executeTransaction method)
   * @param uuid selected file uuid
   * @param fileRepository repository to use for database operation
   * @param incrementDownloadCount set true to increment download counter, default false
   * @param includeRelations set true to include related entity in result, default false
   * @return {@link File} selected file entity
   * @throws {@link OpenArtifactoryError} if uuid does not exist in database
   * @private
   */
  private static async get(
    uuid: Uuid,
    fileRepository: Repository<File>,
    incrementDownloadCount = false,
    includeRelations = false
  ): Promise<File> {
    const fileEntity = await fileRepository.findOne({
      where: { uuid },
      relations: {
        group: includeRelations,
        badges: includeRelations
      }
    })
    if (fileEntity) {
      if (fs.existsSync(fileEntity.path)) {
        if (incrementDownloadCount) {
          fileEntity.downloadCount += 1
          await fileRepository.save(fileEntity)
        }
        return fileEntity
      }

      // Cleaning db if file not found
      await fileRepository.remove(fileEntity)
    }

    throw new OpenArtifactoryError(404, `${uuid} not found`)
  }
}
