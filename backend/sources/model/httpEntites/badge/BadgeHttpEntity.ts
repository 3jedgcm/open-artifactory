import { AutoMap } from '@automapper/classes'
import { Color, Id } from '../primitivesHttpEnties'

/**
 * Badge entity model
 */
export default class BadgeHttpEntity {
  /**
   * Badge identifier
   */
  @AutoMap()
    id!: Id

  /**
   * Badge name
   * @example "Badge"
   */
  @AutoMap()
    name!: string

  /**
   * Badge color
   * @example "#1A2B3C"
   */
  @AutoMap()
    color!: Color

  /**
   * Badge description (optional)
   * @example "This is a description"
   */
  @AutoMap()
    description!: string | null

  /**
   * Badge creation date
   * @example "2023-01-01T00:00:00.000Z"
   */
  @AutoMap()
    createdAt!: Date

  /**
   * Badge updating date
   * @example "2023-01-01T00:00:00.000Z"
   */
  @AutoMap()
    updateAt!: Date
}
