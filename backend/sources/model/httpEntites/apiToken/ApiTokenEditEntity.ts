/**
 * API Token creation entity model
 */
export default class ApiTokenEditHttpEntity {
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
}
