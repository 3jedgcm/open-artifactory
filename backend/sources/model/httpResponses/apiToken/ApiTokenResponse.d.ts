import ApiTokenHttpEntity from '../../httpEntites/apiToken/ApiTokenEntity'
import HttpResponse from '../HttpResponse'

/**
 * API Token response model
 */
export default interface ApiTokenResponse extends HttpResponse {

  /**
   * API token entity
   */
  apiToken: ApiTokenHttpEntity
}
