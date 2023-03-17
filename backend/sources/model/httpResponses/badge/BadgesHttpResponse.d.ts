import HttpResponse from '../HttpResponse'
import BadgeHttpEntity from '../../httpEntites/badge/BadgeHttpEntity'

export default interface BadgesHttpResponse extends HttpResponse {
  count: number
  badges: BadgeHttpEntity[]
}
