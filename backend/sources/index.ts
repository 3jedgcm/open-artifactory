import express from 'express'
import dataSource from './services/datasource'
import constants from './constants'
import router from './api/router'
import SecurityService from './services/tools/SecurityService'
import logger, { disableConsole } from './services/tools/logger'

/**
 * Disable default console
 */
disableConsole()

/**
 * Force server use UTC timezone
 */
process.env.TZ = 'UTC'

/**
 * Initialize OTP secret and share it on console
 */
SecurityService.initializeOtp()

/**
 * Init Express server
 */
const server = express()
server.use(router)

/**
 * Connect to database and launch Express server
 */
dataSource.initialize()
  .then(() => {
    server.listen(constants.port, () => {
      logger.info(`Listen on port ${constants.port} : ${constants.baseUrl}`)
    })
  })
  .catch((error) => logger.error('Can not reach database :', error))
