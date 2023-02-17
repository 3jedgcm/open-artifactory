import FileHttpEntity from '../../httpEntites/file/FileHttpEntity'
import HttpResponse from '../HttpResponse'

/**
 * File response model
 */
export default interface FileHttpResponse extends HttpResponse {

  /**
   * Updated file
   */
  file: FileHttpEntity
}
