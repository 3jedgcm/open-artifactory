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
import FileHttpResponse from '../../model/httpResponses/file/FileHttpResponse'
import FileHttpEntity from '../../model/httpEntites/file/FileHttpEntity'
import ErrorHttpResponse from '../../model/httpResponses/ErrorResponse'
import { Comment, FileName, Id } from '../../model/httpEntites/primitivesHttpEnties'
import { fileExample } from '../openApiExamples'
import FileCreateUpdateHttpEntity from '../../model/httpEntites/file/FileUpdateHttpEntity'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'

@Response<ErrorHttpResponse>(500, 'Internal server error', {
  httpCode: 500,
  message: 'Internal server error',
  error: true,
  details: { message: 'Sample error' }
})
@Security('bearer')
@Tags('Upload')
@Route('upload')
export class UploadController extends Controller {
  /**
   * Uploads new file and allows to change file name
   * @summary Uploads file
   * @param file file to upload
   * @param name optional file name
   * @param comment optional file comment
   * @param groupId optional group identifier
   * @param badgeIds optional badge identifiers list
   */
  @SuccessResponse(201, 'Created file entity')
  @Example<FileHttpResponse>(
    {
      httpCode: 201,
      error: false,
      message: 'picture.jpg is stored with uuid 146fb209-af3b-4c67-863a-a98b641c95e5',
      file: fileExample
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
  @Response<ErrorHttpResponse>(404, 'Unknown id', {
    httpCode: 404,
    message: '#1 group not found',
    error: true
  })
  @Response<ErrorHttpResponse>(401, 'Unauthorized', {
    httpCode: 401,
    message: 'Unauthorized',
    error: true
  })
  @Post()
  public async upload(
    @UploadedFile() file: Express.Multer.File,
      @FormField() name?: FileName,
      @FormField() comment?: Comment,
      @FormField() groupId?: Id,
      @FormField() badgeIds?: Id[]
  ): Promise<FileHttpResponse> {
    const toCreate = mapper.map(this.mapFieldsToFile(
      file,
      name,
      comment,
      groupId,
      badgeIds
    ), FileCreateUpdateHttpEntity, File)

    const fileEntity = mapper.map(
      await FileService.upload(file, toCreate),
      File,
      FileHttpEntity
    )

    return {
      httpCode: 201,
      error: false,
      message: `${fileEntity.name} is stored with uuid ${fileEntity.uuid}`,
      file: fileEntity
    }
  }

  /**
   * Map form fields to {@link FileCreateUpdateHttpEntity}
   * @param file file to upload
   * @param name optional file name
   * @param comment optional file comment
   * @param groupId optional group identifier
   * @param badgeIds optional badge identifiers list
   * @throws {@link OpenArtifactoryError} if validation failed
   * @private
   */
  private mapFieldsToFile(
    file: Express.Multer.File,
    name?: any,
    comment?: any,
    groupId?: any,
    badgeIds?: any
  ): FileCreateUpdateHttpEntity {
    let group: number | null = null
    if (groupId) {
      group = Number.parseInt(groupId, 10)
      if (!Number.isInteger(group) || group < 1) {
        throw new OpenArtifactoryError(422, '"groupId" should be an positive integer')
      }
    }

    let badges: number[] = []
    if (badgeIds) {
      try {
        badges = JSON.parse(badgeIds)
      } catch (error) {
        throw new OpenArtifactoryError(422, '"badgeIds" should be an array of positive integer', error)
      }

      if (!Array.isArray(badges)) {
        throw new OpenArtifactoryError(422, '"badgeIds" should be an array of positive integer')
      }
      badges = badges.map((badge) => Number.parseInt(badge as any, 10))
      if (badges.some((badge) => !Number.isInteger(badge) || badge < 1)) {
        throw new OpenArtifactoryError(422, '"badgeIds" should be an array of positive integer')
      }
    }
    return {
      name: name && name.trim().length > 0 ? name.trim() : file.originalname,
      comment,
      groupId: group,
      badgeIds: badges
    }
  }
}
