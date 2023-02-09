import {
  json, Request, Response, Router
} from 'express'
import fileRouter from './routers/fileRouter'
import uploadRouter from './routers/uploadRouter'
import OpenArtifactoryError from '../model/errors/OpenArtifactoryError'
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware'

const router = Router()

router.use(json())

router.use('/files', fileRouter)
router.use('/upload', uploadRouter)

router.get('*', (request: Request, response: Response) => {
  const error = new OpenArtifactoryError(404, 'Not found')
  response.status(404)
    .send(error.httpResponse)
})
router.use(errorHandlerMiddleware)

export default router
