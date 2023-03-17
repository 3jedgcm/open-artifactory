import HttpResponse from './HttpResponse'

export default interface StatusHttpResponse extends HttpResponse {
  ready: boolean
}
