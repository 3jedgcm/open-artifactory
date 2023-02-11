import FileHttpEntity from '../httpEntites/FileHttpEntity'
import HttpResponse from './HttpResponse'

/**
 * Single file entity response model
 */
export default interface FileHttpResponse extends HttpResponse {

  /**
   * Updated file
   */
  file: FileHttpEntity
}
