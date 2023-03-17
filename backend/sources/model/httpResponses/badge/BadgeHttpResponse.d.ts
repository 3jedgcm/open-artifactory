import HttpResponse from '../HttpResponse'
import BadgeHttpEntity from '../../httpEntites/badge/BadgeHttpEntity'

export default interface BadgeHttpResponse extends HttpResponse {
  badge: BadgeHttpEntity
}
