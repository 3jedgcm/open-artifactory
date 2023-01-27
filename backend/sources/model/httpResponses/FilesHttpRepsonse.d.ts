import FileHttpEntity from '../httpEntites/FileHttpEntity'
import HttpResponse from './HttpResponse'

export default interface FilesHttpResponse extends HttpResponse {
  files: FileHttpEntity[]
}
