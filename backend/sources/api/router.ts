import { json, Router } from 'express'
import fileRouter from './routers/fileRouter'
import uploadRouter from './routers/uploadRouter'
import OpenArtifactoryError from '../model/errors/OpenArtifactoryError'
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware'

const router = Router()

router.use(json())

router.use('/files', fileRouter)
router.use('/upload', uploadRouter)

router.get('*', () => {
  throw new OpenArtifactoryError(404, 'Not found')
})
router.use(errorHandlerMiddleware)

export default router
