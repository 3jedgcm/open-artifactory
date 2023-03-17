import { AutoMap } from '@automapper/classes'
import { Id } from '../primitivesHttpEnties'

/**
 * API Token entity model
 */
export default class ApiTokenHttpEntity {
  /**
   * Token identifier
   */
  @AutoMap()
    id!: Id

  /**
   * Token name
   * @example "API key for CI"
   */
  @AutoMap()
    name!: string

  /**
   * Token description (optional)
   * @example "This is a description"
   */
  @AutoMap()
    description!: string | null

  /**
   * Token expiration date (optional)
   * @example "2023-01-01T00:00:00.000Z"
   */
  @AutoMap()
    expireAt!: Date | null

  /**
   * Token creation date
   * @example "2023-01-01T00:00:00.000Z"
   */
  @AutoMap()
    createdAt!: Date

  /**
   * Token updating date
   * @example "2023-01-01T00:00:00.000Z"
   */
  @AutoMap()
    updateAt!: Date

  /**
   * ValidityStatus
   */
  isValid!: boolean
}
