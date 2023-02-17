import ApiTokenHttpEntity from '../../httpEntites/apiToken/ApiTokenEntity'
import HttpResponse from '../HttpResponse'

/**
 * API Token list response model
 */
export default interface ApiTokensResponse extends HttpResponse {

  /**
   *  API token list entity
   */
  apiTokens: ApiTokenHttpEntity[]

  /**
   *  API token count
   */
  count: number
}
