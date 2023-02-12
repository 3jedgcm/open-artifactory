/**
 * Storage data entity
 */
export default class StorageHttpEntity {
  /**
   * Total space in bytes
   * @example 5368709120
   */
  totalSpace!: number

  /**
   * Used space in bytes
   * @example 2147483648
   */
  usedSpace!: number

  /**
   * Available space in bytes
   * @example 3221225472
   */
  availableSpace!: number

  /**
   * Absolute storage path
   * @example '/open-artifactory/data/files'
   */
  storagePath!: string
}
