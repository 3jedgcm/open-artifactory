import { AutoMap } from '@automapper/classes'
import { Uuid } from './primitivesHttpEnties'

/**
 * File entity model
 */
export default class FileHttpEntity {
  /**
   * File identifier
   */
  @AutoMap()
    uuid!: Uuid

  /**
   * File name
   * @example "picture.jpg"
   */
  @AutoMap()
    name!: string

  /**
   * File mime type
   * @example "image/jpeg"
   */
  @AutoMap()
    mimeType!: string

  /**
   * File size in bytes
   * @example "10578"
   */
  @AutoMap()
    size!: number

  /**
   * File checksum md5 hash
   * @example "7f4fd6614997f869edf8578d81ceba9f"
   */
  @AutoMap()
    hash!: string

  /**
   * File download count
   * @example 10
   */
  @AutoMap()
    downloadCount!: number

  /**
   * File upload date
   * @example "2023-01-01T00:00:00.000Z"
   */
  @AutoMap()
    createdAt!: Date

  /**
   * File URL
   * @example "http://exemple.com/files/146fb209-af3b-4c67-863a-a98b641c95e5"
   */
  url!: string
}
