import express, { Request, Response } from 'express'
import fileUpload, { UploadedFile } from 'express-fileupload'
import * as dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { v4 } from 'uuid'
import dataSource from './datasource'
import repository from './datasource/repository'

dotenv.config()
const port = process.env.PORT ?? 5000
const baseUrl = process.env.BASE_URL ?? `http://localhost:${port}/`
const destinationFolder = process.env.DESTINATION_FOLDER ?? 'uploaded-files'

let maxFileSize = Infinity
if (process.env.MAX_FILE_SIZE && Number.isSafeInteger(process.env.MAX_FILE_SIZE)) {
  maxFileSize = Number.parseFloat(process.env.MAX_FILE_SIZE)
}

const server = express()

server.use(fileUpload({
  limits: { fileSize: maxFileSize },
  createParentPath: true,
}))

server.get('/files/:uuid', async (request: Request, response: Response) => {
  if (!request.params.uuid) {
    response.status(400).send({
      httpCode: 400,
      error: true,
      data: { message: 'Missing file id' },
    })
    return
  }
  const fileEntity = await repository.files.findOneBy({ uuid: request.params.uuid })
  if (fileEntity) {
    if (fs.existsSync(fileEntity.path)) {
      fileEntity.downloadCount += 1
      await repository.files.save(fileEntity)
      response.status(200).download(fileEntity.path, fileEntity.name)
      return
    }
    repository.files.remove(fileEntity)
  }
  response.status(404).send({
    httpCode: 404,
    error: true,
    data: { message: 'File not found' },
  })
})

server.post('/upload', async (request: Request, response: Response) => {
  if (!request.files?.file) {
    response.status(400).send({
      httpCode: 400,
      error: true,
      data: { message: 'Missing file on multipart data' },
    })
    return
  }
  const uploadedFile = Array.isArray(request.files.file)
    ? request.files.file[0] : request.files.file as UploadedFile

  const fileEntity = repository.files.create()
  fileEntity.uuid = v4()
  fileEntity.name = uploadedFile.name
  fileEntity.path = path.join(destinationFolder, fileEntity.uuid)
  fileEntity.hash = uploadedFile.md5
  fileEntity.size = uploadedFile.size

  try {
    await uploadedFile.mv(fileEntity.path)
    await repository.files.save(fileEntity)
    response.status(201).send({
      httpCode: 201,
      error: false,
      data: {
        file: fileEntity,
        url: `${baseUrl}files/${fileEntity.uuid}`,
      },
    })
  } catch (error) {
    response.status(500).send({
      httpCode: 500,
      error: true,
      data: {
        message: 'Error occur during file upload',
        exception: error,
      },
    })
  }
})

dataSource.initialize().then(() => {
  server.listen(port, () => {
    console.log(`Listen on port ${port} : ${baseUrl}`)
  })
})
