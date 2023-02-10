import jwt from 'jsonwebtoken'
import { authenticator } from '@otplib/preset-default'
import fs from 'fs'
import { generate, setErrorLevel } from 'qrcode-terminal'
import path from 'path'
import constants from '../../constants'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'

/**
 * Service to implement security with One-Time Password and JWT Token
 */
export default class SecurityService {
  /**
   * One-Time Password secret get from file
   * @private
   */
  private static otpSecret: string

  /**
   * Checks if OtpToken is right
   * @param otpToken One-Time Password token to check
   * @throws {@link OpenArtifactoryError} if invalid authentication
   */
  static verifyOtpToken(otpToken: string): void {
    if (!authenticator.verify({
      token: otpToken,
      secret: this.otpSecret
    })) {
      throw new OpenArtifactoryError(401, 'Unauthorized')
    }
  }

  /**
   * Generates a JSON Web Token
   * @return JSON web token and expiration date
   */
  static generateJwtToken(): { jwtToken: string, expireAt: Date } {
    const jwtToken = jwt.sign({}, constants.jwtSecret, { expiresIn: constants.jwtExpirationTime })
    const jwtPayload = jwt.decode(jwtToken) as { exp: number }
    return {
      jwtToken,
      expireAt: new Date(jwtPayload.exp * 1000)
    }
  }

  /**
   * Checks if JSON Web Token is right
   * @param jwtToken token to check
   * @throws {@link OpenArtifactoryError} if invalid authentication
   */
  static verifyJwtToken(jwtToken: string): void {
    try {
      jwt.verify(jwtToken, constants.jwtSecret, {
        ignoreNotBefore: false,
        ignoreExpiration: false
      })
    } catch {
      throw new OpenArtifactoryError(401, 'Unauthorized')
    }
  }

  /**
   * Initializes One-Time Password secret
   * Read OTP file, if missing or empty, generate a new one
   * Log OTP secret and QRCode in console
   */
  static initializeOtp(): void {
    this.otpSecret = this.getOrCreateOtpSecret()

    console.log('TOTP secret:', this.otpSecret)

    const authenticatorUrl = authenticator.keyuri('admin', constants.otpServiceName, this.otpSecret)
    console.log('TOTP url:', authenticatorUrl)

    setErrorLevel('H')
    generate(authenticatorUrl, { small: true })
  }

  /**
   * Read OTP file, if missing or empty, generate a new one
   * @private
   * @return OTP secret
   */
  private static getOrCreateOtpSecret(): string {
    if (fs.existsSync(constants.otpFilePath)) {
      const fileValue = fs.readFileSync(constants.otpFilePath)
        .toString()
      if (fileValue && fileValue.trim().length > 0) {
        return fileValue
      }
    }
    const newValue = authenticator.generateSecret()

    const folderPath = path.dirname(constants.otpFilePath)
    if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath)
      .isDirectory()) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    fs.writeFileSync(constants.otpFilePath, newValue, { flag: 'w' })

    return newValue
  }
}
