import File from '../entities/File'

export interface HttpPayload {}

export interface BaseHttpResponse {
    httpCode: number,
    error: boolean,
    data: HttpPayload
}

export interface HttpError extends HttpPayload {
    message: string
    exception: unknown
}

export interface FileUploadResponse extends HttpPayload {
    file: File
    url: string
}
