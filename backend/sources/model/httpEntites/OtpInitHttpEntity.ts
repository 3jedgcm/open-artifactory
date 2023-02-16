import OtpLoginHttpEntity from './OtpLoginHttpEntity'

/**
 * One-Time Password initialization entity model
 */
export default class OtpInitHttpEntity extends OtpLoginHttpEntity {
  /**
   * One-Time Password secret to save
   * @example "PILQOGK4OBLTUQKI"
   */
  otpSecret!: string
}
