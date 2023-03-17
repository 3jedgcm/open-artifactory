import HttpResponse from '../HttpResponse'
import GroupHttpEntity from '../../httpEntites/group/GroupHttpEntity'

export default interface GroupHttpResponse extends HttpResponse {
  group: GroupHttpEntity
}
