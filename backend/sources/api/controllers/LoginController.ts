import {
  Body, Post, Response, Route, SuccessResponse, Tags
} from 'tsoa'
import OtpHttpEntity from '../../model/httpEntites/OtpHttpEntity'
import SecurityService from '../../services/security/SecurityService'
import BearerHttpResponse from '../../model/httpResponses/BearerTokenHttpResponse'
import ErrorHttpResponse from '../../model/httpResponses/ErrorResponse'

@Response<ErrorHttpResponse>(500, 'Internal server error', {
  httpCode: 500,
  message: 'Internal server error',
  error: true,
  details: { message: 'Sample error' }
})
@Tags('Login')
@Route('login')
export class LoginController {
  /**
   * Generates a JWT token from One-Time Password token
   * @summary Login into Open-artifactory
   * @param otpEntity
   */
  @SuccessResponse(200, 'Bearer token')
  @Response<ErrorHttpResponse>(422, 'Validation failed error', {
    httpCode: 422,
    message: 'Validation failed',
    error: true,
    details: {
      field: {
        message: 'Validation message',
        value: 'Bad value'
      }
    }
  })
  @Response<ErrorHttpResponse>(401, 'Unauthorized', {
    httpCode: 401,
    message: 'Unauthorized',
    error: true
  })
  @Post()
  async login(@Body() otpEntity: OtpHttpEntity): Promise<BearerHttpResponse> {
    SecurityService.verifyOtpToken(otpEntity.otpToken)

    const {
      jwtToken,
      expireAt
    } = SecurityService.generateJwtToken()
    return {
      httpCode: 200,
      error: false,
      message: 'Successfully logged in',
      jwtToken,
      expireAt,
      authenticationHeader: `Bearer ${jwtToken}}`
    }
  }
}
