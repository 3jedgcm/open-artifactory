import HttpResponse from '../HttpResponse'
import StorageHttpEntity from '../../httpEntites/file/StorageHttpEntity'

/**
 * Storage data response entity
 */
export default interface StorageHttpResponse extends HttpResponse {

  /**
   * Storage data
   */
  storageData: StorageHttpEntity

}
