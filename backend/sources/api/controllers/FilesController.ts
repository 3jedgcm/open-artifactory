import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Path,
  Post,
  Put,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags
} from 'tsoa'
import fs from 'fs'
import { ReadStream } from 'typeorm/browser/platform/BrowserPlatformTools'
import mapper from '../../services/mapper'
import FileService from '../../services/entityServices/FileService'
import File from '../../model/entities/File'
import FileHttpEntity from '../../model/httpEntites/FileHttpEntity'
import FileHttpResponse from '../../model/httpResponses/FileHttpResponse'
import FilesHttpResponse from '../../model/httpResponses/FilesHttpRepsonse'
import FileUpdateHttpEntity from '../../model/httpEntites/FileUpdateHttpEntity'
import { Uuid } from '../../model/httpEntites/primitivesHttpEnties'
import ErrorHttpResponse from '../../model/httpResponses/ErrorResponse'
import { fileExample, storageExample } from '../openApiExamples'
import StorageHttpResponse from '../../model/httpResponses/StorageHttpResponse'

@Response<ErrorHttpResponse>(500, 'Internal server error', {
  httpCode: 500,
  message: 'Internal server error',
  error: true,
  details: { message: 'Sample error' }
})
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
@Tags('Files')
@Route('files')
export class FilesController extends Controller {
  /**
   * Gets file list
   * @summary Gets files
   */
  @SuccessResponse(200, 'File list')
  @Example<FilesHttpResponse>({
    httpCode: 200,
    error: false,
    message: '3 stored files',
    count: 3,
    files: [fileExample, fileExample, fileExample]
  })
  @Response<ErrorHttpResponse>(401, 'Unauthorized', {
    httpCode: 401,
    message: 'Unauthorized',
    error: true
  })
  @Security('bearer')
  @Get()
  async getList(): Promise<FilesHttpResponse> {
    const files = mapper.mapArray(await FileService.getList(), File, FileHttpEntity)
    return {
      httpCode: 200,
      error: false,
      count: files.length,
      message: files.length > 0
        ? `${files.length} stored file${files.length === 1 ? '' : 's'}`
        : 'No stored file',
      files
    }
  }

  /**
   * Gets storage data
   * @summary gets storage data
   */
  @Response<ErrorHttpResponse>(401, 'Unauthorized', {
    httpCode: 401,
    message: 'Unauthorized',
    error: true
  })
  @Example<StorageHttpResponse>({
    httpCode: 200,
    error: false,
    message: 'Disk space available : 3221225472 bytes (60.00 %)',
    storageData: storageExample
  })
  @Security('bearer')
  @Get('storage')
  async getStorage(): Promise<StorageHttpResponse> {
    const storageData = await FileService.getStorageData()
    const percentage = ((storageData.availableSpace / storageData.totalSpace) * 100).toFixed(2)

    return {
      httpCode: 200,
      error: false,
      message: `Disk space available : ${storageData.availableSpace} bytes (${percentage}%)`,
      storageData
    }
  }

  /**
   * Download file by uuid
   * @summary Download file
   * @param uuid downloaded file uuid
   */
  @SuccessResponse(200, 'File stream')
  @Response<ErrorHttpResponse>(404, 'Unknown uuid', {
    httpCode: 422,
    message: '4b74fdb7-b6a3-4718-964a-abf130bf3508 file not found',
    error: true
  })
  @Get('{uuid}')
  async download(@Path() uuid: Uuid): Promise<ReadStream> {
    const file = await FileService.get(uuid, true)

    this.setHeader('Content-Type', file.mimeType)
    this.setHeader('Content-Length', file.size.toString())
    this.setHeader('Content-Disposition', `attachment; filename=${file.name}`)
    return fs.createReadStream(file.path)
  }

  /**
   * Changes file uuid
   * @summary Changes file uuid
   * @param uuid updated file uuid
   */
  @SuccessResponse(200, 'Updated file entity')
  @Example<FileHttpResponse>({
    httpCode: 200,
    error: false,
    message: '323f80a1-0a6c-44ef-a067-c9c6a86526fa uuid has been changed by 146fb209-af3b-4c67-863a-a98b641c95e5',
    file: fileExample
  })
  @Response<ErrorHttpResponse>(404, 'Unknown uuid', {
    httpCode: 422,
    message: '4b74fdb7-b6a3-4718-964a-abf130bf3508 file not found',
    error: true
  })
  @Response<ErrorHttpResponse>(401, 'Unauthorized', {
    httpCode: 401,
    message: 'Unauthorized',
    error: true
  })
  @Security('bearer')
  @Post('{uuid}/change-uuid')
  async changeUuid(@Path() uuid: Uuid): Promise<FileHttpResponse> {
    const file = mapper.map(await FileService.changeUuid(uuid), File, FileHttpEntity)

    return {
      httpCode: 200,
      error: false,
      message: `${file.name} (${uuid}) uuid has been changed by ${file.uuid}`,
      file
    }
  }

  /**
   * Updates file values by uuid
   * @summary Updates file
   * @param uuid updated file uuid
   * @param body updated values
   */
  @SuccessResponse(200, 'Updated file entity')
  @Example<FileHttpResponse>({
    httpCode: 200,
    error: false,
    message: '146fb209-af3b-4c67-863a-a98b641c95e5 has been updated',
    file: fileExample
  })
  @Response<ErrorHttpResponse>(404, 'Unknown uuid', {
    httpCode: 422,
    message: '4b74fdb7-b6a3-4718-964a-abf130bf3508 file not found',
    error: true
  })
  @Response<ErrorHttpResponse>(401, 'Unauthorized', {
    httpCode: 401,
    message: 'Unauthorized',
    error: true
  })
  @Security('bearer')
  @Put('{uuid}')
  async update(@Path() uuid: Uuid, @Body() body: FileUpdateHttpEntity)
    : Promise<FileHttpResponse> {
    const updatedFile = mapper.map(body, FileUpdateHttpEntity, File)

    const file = mapper.map(await FileService.update(uuid, updatedFile), File, FileHttpEntity)

    return {
      httpCode: 200,
      error: false,
      message: `${uuid} has been updated`,
      file
    }
  }

  /**
   * Deletes file by uuid
   * @summary Deletes file
   * @param uuid deleted file uuid
   */
  @SuccessResponse(200, 'Deleted file entity')
  @Example<FileHttpResponse>({
    httpCode: 200,
    error: false,
    message: '146fb209-af3b-4c67-863a-a98b641c95e5 has been deleted',
    file: fileExample
  })
  @Response<ErrorHttpResponse>(404, 'Unknown uuid', {
    httpCode: 422,
    message: '4b74fdb7-b6a3-4718-964a-abf130bf3508 file not found',
    error: true
  })
  @Response<ErrorHttpResponse>(401, 'Unauthorized', {
    httpCode: 401,
    message: 'Unauthorized',
    error: true
  })
  @Security('bearer')
  @Delete('{uuid}')
  async delete(@Path() uuid: Uuid): Promise<FileHttpResponse> {
    const file = mapper.map(await FileService.delete(uuid), File, FileHttpEntity)

    return {
      httpCode: 200,
      error: false,
      message: `${file.name} (${file.uuid}) has been deleted`,
      file
    }
  }
}
