import {
  Controller, Example, Get, Response, Route, SuccessResponse, Tags
} from 'tsoa'
import StatusHttpResponse from '../../model/httpResponses/StatusHttpResponse'
import SecurityService from '../../services/tools/SecurityService'
import ErrorHttpResponse from '../../model/httpResponses/ErrorResponse'

@Response<ErrorHttpResponse>(500, 'Internal server error', {
  httpCode: 500,
  message: 'Internal server error',
  error: true,
  details: { message: 'Sample error' }
})
@Tags('Status')
@Route('status')
export class StatusController extends Controller {
  /**
   * Gets status of instance
   * @summary Gets status
   */
  @SuccessResponse(200, 'Status')
  @Example<StatusHttpResponse>({
    httpCode: 200,
    error: false,
    message: '\'Open Artifactory is ready',
    ready: true
  })
  @Get()
  get(): StatusHttpResponse {
    const ready = SecurityService.otpStatus

    return {
      httpCode: 200,
      error: false,
      message: ready ? 'Open Artifactory is ready' : 'Open Artifactory need initialization',
      ready
    }
  }
}
