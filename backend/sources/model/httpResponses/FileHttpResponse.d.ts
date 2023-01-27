import FileHttpEntity from '../httpEntites/FileHttpEntity'
import HttpResponse from './HttpResponse'

export default interface FileHttpResponse extends HttpResponse {
  file: FileHttpEntity
}
