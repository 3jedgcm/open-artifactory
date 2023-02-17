import { Request } from 'express'
import OpenArtifactoryError from '../../model/errors/OpenArtifactoryError'
import SecurityService from '../../services/security/SecurityService'

const TSOA_BEARER_SECURITY_NAME = 'bearer'
/**
 * Implemntation of TSOA Express authentication with Bearer JWT
 * @param request Express request object
 * @param securityName TSOA security name
 * @param scopes TSOA scopes
 * @throws {@link OpenArtifactoryError} if invalid authentication
 */
export const expressAuthentication = async (
  request: Request,
  securityName: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scopes?: string[]
): Promise<void> => {
  if (securityName === TSOA_BEARER_SECURITY_NAME) {
    const bearerToken = request.header('Authorization')
      ?.trim()
    if (bearerToken) {
      if (bearerToken?.startsWith('Bearer') && bearerToken.split(' ').length === 2) {
        const jwtToken = bearerToken.split(' ')[1]
        await SecurityService.verifyJwtToken(jwtToken)
        return
      }
      throw new OpenArtifactoryError(401, 'Unauthorized')
    }

    const token = (request.query?.token as (string | undefined))?.trim()
    if (token) {
      await SecurityService.verifyJwtToken(token)
    } else {
      throw new OpenArtifactoryError(401, 'Unauthorized')
    }
  }
}
