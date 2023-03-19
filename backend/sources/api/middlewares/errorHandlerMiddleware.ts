import { NextFunction, Request, Response } from 'express'
import { ValidateError } from '@tsoa/runtime'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'
import logger from '../../services/tools/logger'

/**
 * Handle errors and set right status and payload on Express response
 * @param error Caught error
 * @param request Express request object
 * @param response Express response object
 * @param nextFunction Express NextFunction object
 */
export default (
  error: any,
  request: Request,
  response: Response,
  nextFunction: NextFunction
): void => {
  if (error) {
    let artifactoryError: OpenArtifactoryError

    if (error instanceof OpenArtifactoryError) {
      artifactoryError = error as OpenArtifactoryError
    } else if (error instanceof ValidateError) {
      const validateError = error as ValidateError
      artifactoryError = new OpenArtifactoryError(422, 'Validation failed', validateError.fields)
    } else {
      logger.error('An error occur :', error)
      artifactoryError = new OpenArtifactoryError(500, 'Internal server error', { message: error.message })
    }

    response.status(artifactoryError.httpResponse.httpCode)
      .send(artifactoryError.httpResponse)
  }
  nextFunction(error)
}
