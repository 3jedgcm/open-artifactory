import * as dotenv from 'dotenv'
import * as Process from 'process'

class Constants {
  private process: typeof Process

  constructor() {
    dotenv.config()
    this.process = process
  }

  get port() {
    return this.process.env.PORT ?? 5000
  }

  get baseUrl() {
    const url = this.process.env.BASE_URL ?? `http://localhost:${this.port}/`
    return url.endsWith('/') ? url : `${url}/`
  }

  get filesFolder() {
    return this.process.env.FILES_PATH ?? 'files'
  }

  get databasePath() {
    return this.process.env.DATABASE_PATH ?? 'open-artifactory.db'
  }

  get maxFileSize() {
    let maxFileSize = Infinity
    if (
      this.process.env.MAX_FILE_SIZE
      && Number.isSafeInteger(this.process.env.MAX_FILE_SIZE)
    ) {
      maxFileSize = Number.parseFloat(this.process.env.MAX_FILE_SIZE)
    }
    return maxFileSize
  }

  get adminLogin() {
    return this.process.env.ADMIN_LOGIN ?? 'admin'
  }

  get adminPassword() {
    return this.process.env.ADMIN_PASSWORD ?? 'admin'
  }
}

export default new Constants()
