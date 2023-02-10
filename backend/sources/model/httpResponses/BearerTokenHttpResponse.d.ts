import HttpResponse from './HttpResponse'

/**
 * Bearer response
 */
export default interface BearerHttpResponse extends HttpResponse {
  /**
   * JSON Web Token
   // eslint-disable-next-line max-len
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
   */
  jwtToken: string

  /**
   * Token expiration date
   * @example "2023-01-01T00:00:00.000Z"
   */
  expireAt: Date
}
