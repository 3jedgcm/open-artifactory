import HttpResponse from '../HttpResponse'
import GroupHttpEntity from '../../httpEntites/group/GroupHttpEntity'

export default interface GroupsHttpResponse extends HttpResponse {
  count: number
  groups: GroupHttpEntity[]
}
