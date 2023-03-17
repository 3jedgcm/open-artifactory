import { Color } from '../primitivesHttpEnties'

/**
 * Badge create/update entity model
 */
export default class BadgeCreateUpdateHttpEntity {
  /**
   * New badge name
   * @pattern .*[\S\s].* 'name' is required
   * @example "Badge"
   */
  name!: string

  /**
   * New badge color
   * @example "#1A2B3C"
   */
  color!: Color

  /**
   * New badge description (optional)
   * @example "This is a description"
   */
  description?: string | null
}
