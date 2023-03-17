/**
 * API Token creation entity model
 */
export default class ApiTokenCreateHttpEntity {
  /**
   * Token name
   * @pattern .*[\S\s].* 'name' is required
   * @example "API key for CI"
   */
  name!: string

  /**
   * Token description (optional)
   * @example "This is a description"
   */
  description?: string | null

  /**
   * Token expiration date (optional)
   * @example "2023-01-01T00:00:00.000Z"
   */
  expireAt?: Date | null
}
