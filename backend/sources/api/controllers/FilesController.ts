import { Request, Response } from 'express'
import mapper from '../../services/mapper'
import FileService from '../../services/entityServices/FileService'
import File from '../../model/entities/File'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'
import FileHttpEntity from '../../model/httpEntites/FileHttpEntity'
import FileHttpResponse from '../../model/httpResponses/FileHttpResponse'
import FilesHttpResponse from '../../model/httpResponses/FilesHttpRepsonse'
import FileUpdateHttpEntity from '../../model/httpEntites/FileUpdateHttpEntity'

export default class FilesController {
  static async getList(): Promise<FilesHttpResponse> {
    const files = mapper.mapArray(await FileService.getList(), File, FileHttpEntity)

    return {
      httpCode: 200,
      error: false,
      message: files.length > 0
        ? `${files.length} file${files.length === 1 ? '' : 's'} stored`
        : ' No file stored',
      files
    }
  }

  static async download(request: Request, response: Response) {
    if (!request.params.uuid) {
      throw new OpenArtifactoryError(400, 'Missing file uuid')
    }

    const file = await FileService.get(request.params.uuid, true)
    const httpCode = 200

    response.setHeader('Content-Type', file.mineType)
      .status(httpCode)
      .download(file.path, file.name)
  }

  static async update(request: Request): Promise<FileHttpResponse> {
    if (!request.params.uuid) {
      throw new OpenArtifactoryError(400, 'Missing file uuid')
    }

    const body = request.body as FileUpdateHttpEntity
    if (!body || !body.name) {
      throw new OpenArtifactoryError(400, 'Invalid body')
    }

    const updatedFile = mapper.map(body, FileUpdateHttpEntity, File)
    const file = mapper.map(
      await FileService.update(request.params.uuid, updatedFile),
      File,
      FileHttpEntity
    )

    return {
      httpCode: 200,
      error: false,
      message: `${request.params.uuid} file successfully updated`,
      file
    }
  }

  static async changeUuid(request: Request): Promise<FileHttpResponse> {
    if (!request.params.uuid) {
      throw new OpenArtifactoryError(400, 'Missing file uuid')
    }

    const file = mapper.map(await FileService.changeUuid(request.params.uuid), File, FileHttpEntity)
    return {
      httpCode: 200,
      error: false,
      message: `${file.name} (${request.params.uuid}) uuid has been changed by ${file.uuid}`,
      file
    }
  }

  static async delete(request: Request): Promise<FileHttpResponse> {
    if (!request.params.uuid) {
      throw new OpenArtifactoryError(400, 'Missing file uuid')
    }

    const file = mapper.map(await FileService.delete(request.params.uuid), File, FileHttpEntity)

    return {
      httpCode: 200,
      error: false,
      message: `${file.name} (${file.uuid}) has been deleted`,
      file
    }
  }
}
