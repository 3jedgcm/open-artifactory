import FileHttpEntity from '../httpEntites/FileHttpEntity'
import HttpResponse from './HttpResponse'

/**
 * Multiple file entities response model
 */
export default interface FilesHttpResponse extends HttpResponse {
  /**
   * Stored files count
   * @example "3"
   */
  count: number

  /**
   * File list
   */
  files: FileHttpEntity[]

}
