import { AutoMap } from '@automapper/classes'

/**
 * API Token creation entity model
 */
export default class ApiTokenCreateHttpEntity {
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
  comment?: string | null

  /**
   * Token expiration date (optional)
   * @example "2023-01-01T00:00:00.000Z"
   */
  expireAt?: Date | null
}
