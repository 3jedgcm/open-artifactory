import { Router } from 'express'
import { callAsynchronousHttpResponseController } from '../controllerHelpers'
import uploadFileMiddleware from '../middlewares/uploadFileMiddleware'
import authorizationMiddleware from '../middlewares/authorizationMiddleware'
import UploadController from '../controllers/UploadController'

const uploadRouter = Router()

uploadRouter.use(uploadFileMiddleware)

uploadRouter.post('/', authorizationMiddleware, callAsynchronousHttpResponseController(UploadController.upload))

export default uploadRouter
