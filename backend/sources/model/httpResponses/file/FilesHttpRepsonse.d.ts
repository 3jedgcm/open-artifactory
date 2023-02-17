import FileHttpEntity from '../../httpEntites/file/FileHttpEntity'
import HttpResponse from '../HttpResponse'

/**
 * File list response model
 */
export default interface FilesHttpResponse extends HttpResponse {
  /**
   * Stored files count
   */
  count: number

  /**
   * File list
   */
  files: FileHttpEntity[]

}
