import { AutoMap } from '@automapper/classes'

/**
 * File entity model for update
 */
export default class FileUpdateHttpEntity {
  /**
   * New file name
   * @pattern [\S\s]+[\S]+ 'name' is required
   * @example "picture.jpg"
   */
  @AutoMap()
    name!: string

  /**
   * New file comment (optional)
   * @example "This is a comment"
   */
  comment?: string | null
}
