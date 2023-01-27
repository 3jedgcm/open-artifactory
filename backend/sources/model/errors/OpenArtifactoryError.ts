import ErrorHttpResponse from '../httpResponses/ErrorResponse'

export default class OpenArtifactoryError extends Error {
  httpResponse: ErrorHttpResponse

  constructor(httpCode: number, message: string, parent?: unknown) {
    super(message)
    this.httpResponse = {
      httpCode,
      error: true,
      message,
      stacktrace: parent
    }
  }
}
