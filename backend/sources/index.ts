import express from 'express'
import dataSource from './services/datasource'
import constants from './constants'
import router from './api/router'

const server = express()

dataSource.initialize()
  .then(() => {
    server.use(router)

    server.listen(constants.port, () => {
      console.log(`Listen on port ${constants.port} : ${constants.baseUrl}`)
    })
  })
