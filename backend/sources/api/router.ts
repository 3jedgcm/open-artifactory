import {
  json, Request, Response, Router, static as expressStatic
} from 'express'
import fileRouter from './routers/fileRouter'
import uploadRouter from './routers/uploadRouter'
import OpenArtifactoryError from '../model/errors/OpenArtifactoryError'
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware'
import path from 'path'

const router = Router()

router.use(json())

router.use('/files', fileRouter)
router.use('/upload', uploadRouter)

router.use(expressStatic(path.join("./", 'public')));

router.get('/', function (req, res) {
  res.sendFile(path.join("./", 'public', 'index.html'));
})

router.get('*', (request: Request, response: Response) => {
  const error = new OpenArtifactoryError(404, 'Not found')
  response.status(404)
    .send(error.httpResponse)
})
router.use(errorHandlerMiddleware)

export default router
