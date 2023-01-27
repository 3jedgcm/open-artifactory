import { Router } from 'express'
import {
  callAsynchronousController,
  callAsynchronousHttpResponseController
} from '../controllerHelpers'
import authorizationMiddleware from '../middlewares/authorizationMiddleware'
import FilesController from '../controllers/FilesController'

const fileRouter = Router()

fileRouter.get('/', authorizationMiddleware, callAsynchronousHttpResponseController(FilesController.getList))
fileRouter.get('/:uuid', callAsynchronousController(FilesController.download))
fileRouter.put('/:uuid', callAsynchronousHttpResponseController(FilesController.update))
fileRouter.post('/:uuid/change-uuid', authorizationMiddleware, callAsynchronousHttpResponseController(FilesController.changeUuid))
fileRouter.delete('/:uuid', authorizationMiddleware, callAsynchronousHttpResponseController(FilesController.delete))

export default fileRouter
