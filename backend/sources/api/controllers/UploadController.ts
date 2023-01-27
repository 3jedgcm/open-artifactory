import { Request } from 'express'
import { UploadedFile } from 'express-fileupload'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'
import mapper from '../../services/mapper'
import FileService from '../../services/entityServices/FileService'
import File from '../../model/entities/File'
import FileHttpResponse from '../../model/httpResponses/FileHttpResponse'
import FileHttpEntity from '../../model/httpEntites/FileHttpEntity'

export default class UploadController {
  static async upload(request: Request): Promise<FileHttpResponse> {
    if (!request.files?.file) {
      throw new OpenArtifactoryError(400, 'Missing file on multipart data')
    }

    const uploadedFile = Array.isArray(request.files.file)
      ? request.files.file[0] : request.files.file as UploadedFile

    const name = request.body.name as string ?? undefined

    const file = mapper.map(await FileService.upload(uploadedFile, name), File, FileHttpEntity)
    return {
      httpCode: 201,
      error: false,
      message: `${file.name} is stored with uuid ${file.uuid}`,
      file
    }
  }
}
