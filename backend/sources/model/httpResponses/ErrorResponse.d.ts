import HttpResponse from './HttpResponse'

/**
 * Error response model
 */
export default interface ErrorHttpResponse extends HttpResponse {
  /**
   * Error details
   * @example {}
   */
  details?: unknown
}
