import HttpResponse from './HttpResponse'

export default interface ErrorHttpResponse extends HttpResponse {
  stacktrace?: unknown
}
