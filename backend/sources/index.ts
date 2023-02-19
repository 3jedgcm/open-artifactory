import express from 'express'
import dataSource from './services/datasource'
import constants from './constants'
import router from './api/router'
import SecurityService from './services/security/SecurityService'

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
      console.log(`Listen on port ${constants.port} : ${constants.baseUrl}`)
    })
  })
