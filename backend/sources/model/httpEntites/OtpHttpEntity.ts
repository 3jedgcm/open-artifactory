/**
 * One-Time Password entity model
 */
export default class OtpHttpEntity {
  /**
   * One-Time Password token to login
   * @pattern [0-9]{6}
   * @example "1234546"
   */
  otpToken!: string
}
