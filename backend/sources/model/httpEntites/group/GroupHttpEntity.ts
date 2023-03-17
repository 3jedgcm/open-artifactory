import { AutoMap } from '@automapper/classes'
import { Id } from '../primitivesHttpEnties'

/**
 * Group entity model
 */
export default class GroupHttpEntity {
  /**
   * Group id
   */
  @AutoMap()
    id!: Id

  /**
   * Group name
   * @example "Group"
   */
  @AutoMap()
    name!: string

  /**
   * Group description (optional)
   * @example "This is a description"
   */
  @AutoMap()
    description!: string | null

  /**
   * Group creation date
   * @example "2023-01-01T00:00:00.000Z"
   */
  @AutoMap()
    createdAt!: Date

  /**
   * Group updating date
   * @example "2023-01-01T00:00:00.000Z"
   */
  @AutoMap()
    updateAt!: Date
}
