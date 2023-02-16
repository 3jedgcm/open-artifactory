import {
  Body, Example, Post, Response, Route, SuccessResponse, Tags
} from 'tsoa'
import OtpLoginHttpEntity from '../../model/httpEntites/OtpLoginHttpEntity'
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
   * @param otpEntity otp token
   */
  @SuccessResponse(200, 'Bearer token')
  @Example<BearerHttpResponse>({
    httpCode: 200,
    error: false,
    message: 'Successfully logged in',
    jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    expireAt: new Date('2023-01-01T00:00:00.000Z')
  })
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
  public async login(@Body() otpEntity: OtpLoginHttpEntity): Promise<BearerHttpResponse> {
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
      expireAt
    }
  }
}
