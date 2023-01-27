import { NextFunction, Request, Response } from 'express'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'

export default (
  error: unknown,
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  if (error) {
    const artifactoryError: OpenArtifactoryError = error instanceof OpenArtifactoryError
      ? error as OpenArtifactoryError
      : new OpenArtifactoryError(500, 'Internal server errors', error)

    console.error('Error occur', artifactoryError)
    response.status(artifactoryError.httpResponse.httpCode)
      .send(artifactoryError.httpResponse)
  }
  nextFunction(error)
}
