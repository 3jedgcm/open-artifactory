import ErrorHttpResponse from '../httpResponses/ErrorResponse'

/**
 * Open artifactory backend error
 * Helper to handle errors
 * Creates {@link ErrorHttpResponse} to answer http call
 */
export default class OpenArtifactoryError extends Error {
  /**
   * Error Http response
   */
  httpResponse: ErrorHttpResponse

  constructor(httpCode: number, message: string, parent?: unknown) {
    super(message)
    this.httpResponse = {
      httpCode,
      error: true,
      message,
      details: parent
    }
  }
}
