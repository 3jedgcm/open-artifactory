import ApiTokenResponse from './ApiTokenResponse'

/**
 * API Token creation response model
 */
export default interface ApiTokenCreateResponse extends ApiTokenResponse {

  /**
   * Bearer token to login with api key
   *   // eslint-disable-next-line max-len
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
   */
  bearerToken: string
}
