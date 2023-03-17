import { Id } from '../primitivesHttpEnties'

/**
 * File entity model for update
 */
export default class FileUpdateHttpEntity {
  /**
   * New file name
   * @pattern .*[\S\s].* 'name' is required
   * @example "picture.jpg"
   */
  name!: string

  /**
   * New file comment (optional)
   * @example "This is a comment"
   */
  comment?: string | null

  /**
   * New group id (optional)
   * @example "1"
   */
  groupId?: Id | null

  /**
   * New badge id list (optional)
   */
  badgeIds?: Id[] | null
}
