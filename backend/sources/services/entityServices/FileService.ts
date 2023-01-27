import { UploadedFile } from 'express-fileupload'
import { QueryRunner } from 'typeorm'
import fs from 'fs'
import { v4 } from 'uuid'
import File from '../../model/entities/File'
import repository from '../datasource/repository'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'
import datasource from '../datasource'

export default class FileService {
  static async getList(): Promise<File[]> {
    const files = await repository.files.find()
    files.filter((file) => {
      if (!fs.existsSync(file.path)) {
        fs.unlinkSync(file.path)
        return false
      }
      return true
    })
    return files
  }

  static async get(uuid: string, incrementDownloadCount = false): Promise<File> {
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

  static async upload(
    uploadedFile: UploadedFile,
    name: string | undefined = undefined
  )
    : Promise<File> {
    let fileEntity: File
    let queryRunner!: QueryRunner

    try {
      fileEntity = repository.files.create()
      fileEntity.hash = uploadedFile.md5
      fileEntity.size = uploadedFile.size
      fileEntity.mineType = uploadedFile.mimetype

      fileEntity.name = name ?? uploadedFile.name

      queryRunner = datasource.createQueryRunner()
      await queryRunner.connect()
      await queryRunner.startTransaction()

      fileEntity = await repository.files.save(fileEntity)
      await uploadedFile.mv(fileEntity.path)

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

  static async changeUuid(uuid: string): Promise<File> {
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

  static async delete(uuid: string): Promise<File> {
    const fileEntity = await this.get(uuid)

    if (fs.existsSync(fileEntity.path)) {
      fs.unlinkSync(fileEntity.path)
    }

    await repository.files.remove(fileEntity)
    return fileEntity
  }

  static async update(uuid: string, updatedFile: File): Promise<File> {
    let fileEntity = await this.get(uuid)

    fileEntity.name = updatedFile.name
    fileEntity = await repository.files.save(fileEntity)

    return fileEntity
  }
}
