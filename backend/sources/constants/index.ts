import * as dotenv from 'dotenv'

/**
 * Constants definitions
 */
class Constants {
  constructor() {
    dotenv.config()
  }

  /**
   * Listened port by HTTP server
   */
  get port() {
    return process.env.PORT ?? 5000
  }

  /**
   * Public URL to reach API
   * Used to provide file URLs
   */
  get baseUrl() {
    const url = process.env.BASE_URL ?? `http://localhost:${this.port}/`
    return url.endsWith('/') ? url : `${url}/`
  }

  /**
   * Path of folder to upload files
   */
  get filesFolderPath() {
    return process.env.FILES_PATH ?? 'data/files'
  }

  /**
   * Path of SQLite3 database
   */
  get databaseFilePath() {
    return process.env.DATABASE_PATH ?? 'data/open-artifactory.db'
  }

  /**
   * One-Time Password service name
   */
  get otpServiceName() {
    return process.env.OTP_SERVICE_NAME ?? 'open-artifactory'
  }

  /**
   * Path of otp secret file
   */
  get otpFilePath() {
    return process.env.OTP_SECRET_PATH ?? 'data/open-artifactory.otp.secret'
  }

  /**
   * JWT secret
   */
  get jwtSecret() {
    return process.env.JWT_SECRET ?? 'open-artifactory-secret'
  }

  /**
   * JWT expiration time
   * Accept value in seconds or add unit (ex : '1h' or '2 days')
   */
  get jwtExpirationTime() {
    return process.env.JWT_EXPIRATION_TIME ?? '20m'
  }

  /**
   * Salt rounds for hash algorithm
   */
  get saltRounds() {
    return Number(process.env.SALT_ROUNDS) ?? 10
  }

  /**
   * Storage limit in bytes (-1 = no limit)
   */
  get storageLimit() {
    return Number(process.env.STORAGE_LIMIT) ?? -1
  }
}

export default new Constants()
