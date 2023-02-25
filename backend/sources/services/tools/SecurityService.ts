import jwt, { SignOptions } from 'jsonwebtoken'
import { authenticator } from '@otplib/preset-default'
import fs from 'fs'
import path from 'path'
import { compare } from 'bcryptjs'
import constants from '../../constants'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'
// eslint-disable-next-line import/no-cycle
import ApiTokenService from '../entityServices/ApiTokenService'

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
   * Checks if otpSecret is set or not
   * @throws {@link OpenArtifactoryError} if secret is already set
   */
  public static verifyOtpSecretStatus(): void {
    if (this.otpSecret) {
      throw new OpenArtifactoryError(403, 'Forbidden')
    }
  }

  /**
   * Create a new One-Time Password secret
   * @return Otp secret and Otp url
   */
  public static createOtpSecret(): { otpSecret: string, otpUrl: string } {
    const otpSecret = authenticator.generateSecret()
    const otpUrl = authenticator.keyuri('admin', constants.otpServiceName, otpSecret)
    return {
      otpSecret,
      otpUrl
    }
  }

  /**
   * Stores One-Time Password
   * Write otpFile with OTP secret
   * @param otpSecret
   */
  public static saveOtpSecret(otpSecret: string): void {
    this.otpSecret = otpSecret

    const folderPath = path.dirname(constants.otpFilePath)
    if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath)
      .isDirectory()) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    fs.writeFileSync(constants.otpFilePath, this.otpSecret, { flag: 'w' })
  }

  /**
   * Initializes One-Time Password secret status
   * Read OTP file and store token is exists
   */
  public static initializeOtp(): void {
    if (fs.existsSync(constants.otpFilePath)) {
      const fileValue = fs.readFileSync(constants.otpFilePath)
        .toString()
      if (fileValue && fileValue.trim().length > 0) {
        this.otpSecret = fileValue.trim()
      }
    }
  }

  /**
   * Checks if OtpToken is right
   * @param otpToken One-Time Password token to check
   * @param otpSecret One-Time Password secret to check (optional, if not set, take instance one)
   * @throws {@link OpenArtifactoryError} if invalid authentication
   */
  public static verifyOtpToken(otpToken: string, otpSecret?: string): void {
    if (!authenticator.verify({
      token: otpToken,
      secret: otpSecret ?? this.otpSecret
    })) {
      throw new OpenArtifactoryError(401, 'Unauthorized')
    }
  }

  /**
   * Generates a JSON Web Token
   * @return JSON web token and expiration date
   */
  public static generateJwtToken(
    defaultExpirationDate: boolean = true,
    payload: object = { isApiToken: false },
    expirationDate?: Date
  ): { jwtToken: string, expireAt?: Date } {
    const jwtOption: SignOptions | undefined = defaultExpirationDate
      ? { expiresIn: constants.jwtExpirationTime }
      : undefined

    let tokenPayload = { ...payload }
    if (!defaultExpirationDate && expirationDate) {
      tokenPayload = {
        ...payload,
        exp: Math.floor(expirationDate.getTime() / 1000)
      }
    }

    const jwtToken = jwt.sign(tokenPayload, constants.jwtSecret, jwtOption)
    const jwtPayload = jwt.decode(jwtToken) as { exp: number }
    return {
      jwtToken,
      expireAt: jwtPayload.exp ? new Date(jwtPayload.exp * 1000) : undefined
    }
  }

  /**
   * Checks if JSON Web Token is right
   * @param jwtToken token to check
   * @throws {@link OpenArtifactoryError} if invalid authentication
   */
  public static async verifyJwtToken(jwtToken: string): Promise<void> {
    try {
      const jwtPayload = jwt.verify(jwtToken, constants.jwtSecret, {
        ignoreNotBefore: false,
        ignoreExpiration: false
      }) as { isApiToken?: boolean, id?: number, key?: string }

      if (jwtPayload.isApiToken) {
        if (jwtPayload.id && jwtPayload.key) {
          const apiToken = await ApiTokenService.get(jwtPayload.id)
          await compare(jwtPayload.key, apiToken.hash)
        } else {
          throw new Error()
        }
      }
    } catch {
      throw new OpenArtifactoryError(401, 'Unauthorized')
    }
  }
}
