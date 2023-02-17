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
   * Token comment (optional)
   * @example "This is a comment"
   */
  comment!: string | null

  /**
   * Token expiration date (optional)
   * @example "2023-01-01T00:00:00.000Z"
   */
  expireAt!: Date | null

  /**
   * Token creation date
   * @example "2023-01-01T00:00:00.000Z"
   */
  @AutoMap()
    createdAt!: Date

  /**
   * ValidityStatus
   */
  isValid!: boolean
}
