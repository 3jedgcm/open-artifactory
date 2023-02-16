import HttpResponse from './HttpResponse'

/**
 * One-Time Password initialization http response
 */
export default interface OtpInitHttpResponse extends HttpResponse {

  /**
   * One-Time Password secret
   * @example "PILQOGK4OBLTUQKI"
   */
  otpSecret: string

  /**
   * One-Time Password link
   * @example "otpauth://totp/open-artifactory:admin?secret=PILQOGK4OBLTUQKI&period=30&digits=6&algorithm=SHA1&issuer=open-artifactory"
   */
  otpUrl: string
}
