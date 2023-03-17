/**
 * Group create/update model entity
 */
export default class GroupCreateUpdateHttpEntity {
  /**
   * New group name
   * @pattern .*[\S\s].* 'name' is required
   * @example "Group"
   */
  name!: string

  /**
   * New group description (optional)
   * @example "This is a description"
   */
  description?: string | null
}
