import {
  Controller,
  Example,
  FormField,
  Post,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
  UploadedFile
} from 'tsoa'
import mapper from '../../services/mapper'
import FileService from '../../services/entityServices/FileService'
import File from '../../model/entities/File'
import FileHttpResponse from '../../model/httpResponses/FileHttpResponse'
import FileHttpEntity from '../../model/httpEntites/FileHttpEntity'
import ErrorHttpResponse from '../../model/httpResponses/ErrorResponse'
import { FileName } from '../../model/httpEntites/primitivesHttpEnties'
import { FileExample } from '../openApiExamples'

@Response<ErrorHttpResponse>(500, 'Internal server error', {
  httpCode: 500,
  message: 'Internal server error',
  error: true,
  details: { message: 'Sample error' }
})
@Tags('Upload')
@Route('upload')
export class UploadController extends Controller {
  /**
   * Uploads new file and allows to change file name
   * @summary Uploads file
   * @param file file to upload
   * @param name optional file name
   */
  @SuccessResponse(201, 'Created file entity')
  @Example<FileHttpResponse>(
    {
      httpCode: 201,
      error: false,
      message: 'picture.jpg is stored with uuid 146fb209-af3b-4c67-863a-a98b641c95e5',
      file: FileExample
    }
  )
  @Response<ErrorHttpResponse>(422, 'Validation failed error', {
    httpCode: 422,
    message: 'Validation failed',
    error: true,
    details: {
      field: {
        message: 'Validation message',
        value: 'Bad value'
      }
    }
  })
  @Response<ErrorHttpResponse>(401, 'Unauthorized', {
    httpCode: 401,
    message: 'Unauthorized',
    error: true
  })
  @Security('bearer')
  @Post()
  async upload(@UploadedFile() file: Express.Multer.File, @FormField() name?: FileName)
    : Promise<FileHttpResponse> {
    let fileName: string | undefined
    if (name && name.trim().length > 0) {
      fileName = name
    }

    const fileEntity = mapper.map(await FileService.upload(file, fileName), File, FileHttpEntity)

    return {
      httpCode: 201,
      error: false,
      message: `${fileEntity.name} is stored with uuid ${fileEntity.uuid}`,
      file: fileEntity
    }
  }
}
