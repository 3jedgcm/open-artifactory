/**
 * Storage data entity
 */
export default class StorageHttpEntity {
  /**
   * Total space in bytes
   */
  totalSpace!: number

  /**
   * Used space in bytes
   */
  usedSpace!: number

  /**
   * Available space in bytes
   */
  availableSpace!: number

  /**
   * Absolute storage path
   * @example '/open-artifactory/data/files'
   */
  storagePath!: string
}
