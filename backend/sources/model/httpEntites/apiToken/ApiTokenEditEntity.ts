import { AutoMap } from '@automapper/classes'

/**
 * API Token creation entity model
 */
export default class ApiTokenEditHttpEntity {
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
}
