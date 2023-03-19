import {
  Body, Controller, Example, Get, Post, Response, Route, SuccessResponse, Tags
} from 'tsoa'
import OtpInitHttpResponse from '../../model/httpResponses/OtpinitHttpResponse'
import SecurityService from '../../services/tools/SecurityService'
import BearerHttpResponse from '../../model/httpResponses/BearerTokenHttpResponse'
import OtpInitHttpEntity from '../../model/httpEntites/OtpInitHttpEntity'
import ErrorHttpResponse from '../../model/httpResponses/ErrorResponse'

@Response<ErrorHttpResponse>(500, 'Internal server error', {
  httpCode: 500,
  message: 'Internal server error',
  error: true,
  details: { message: 'Sample error' }
})
@Response<ErrorHttpResponse>(403, 'Forbidden', {
  httpCode: 403,
  message: 'Forbidden',
  error: true
})
@Tags('Setup')
@Route('setup')
export class SetupController extends Controller {
  /**
   * Generates a new One-Time Password secret
   * Return a 403 error if OTP secret is already set
   * @summary Gets initialization data
   */
  @SuccessResponse(200, 'One-Time Password secret')
  @Example<OtpInitHttpResponse>({
    httpCode: 200,
    error: false,
    message: 'New OTP secret generated: PILQOGK4OBLTUQKI',
    otpSecret: 'PILQOGK4OBLTUQKI',
    otpUrl: 'otpauth://totp/open-artifactory:admin?secret=PILQOGK4OBLTUQKI&period=30&digits=6&algorithm=SHA1&issuer=open-artifactory'
  })
  @Get()
  public async getOtpSecret(): Promise<OtpInitHttpResponse> {
    SecurityService.verifyOtpSecretStatus()
    const {
      otpSecret,
      otpUrl
    } = SecurityService.createOtpSecret()

    return {
      httpCode: 200,
      error: false,
      message: `New OTP secret generated: ${otpUrl}`,
      otpSecret,
      otpUrl
    }
  }

  /**
   * Saves OTP configuration
   * Returns a 403 error if OTP secret is already set
   * Returns a 401 error if OTP token doesn't match with OTP secret
   * @summary Saves initialization data
   * @param otpInit One-Time Password settings
   */
  @SuccessResponse(200, 'Bearer token')
  @Example<BearerHttpResponse>({
    httpCode: 200,
    error: false,
    message: 'One-Time Password secret successfully saved',
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
  public async saveOtpSecret(@Body() otpInit: OtpInitHttpEntity): Promise<BearerHttpResponse> {
    SecurityService.verifyOtpSecretStatus()
    SecurityService.verifyOtpToken(otpInit.otpToken, otpInit.otpSecret)
    SecurityService.saveOtpSecret(otpInit.otpSecret)

    const {
      jwtToken,
      expireAt
    } = SecurityService.generateJwtToken()

    return {
      httpCode: 200,
      error: false,
      message: 'One-Time Password secret successfully saved',
      jwtToken,
      expireAt: expireAt!
    }
  }
}
