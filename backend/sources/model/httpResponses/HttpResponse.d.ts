/**
 * Base Http response model
 */
export default interface HttpResponse {
  /**
   * Response HTTP code
   * @example "200"
   */
  httpCode: number

  /**
   * Error status
   * @example "false"
   */
  error: boolean

  /**
   * Descriptive message of response
   * @example "Sample message"
   */
  message: string
}
