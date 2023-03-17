import {
  createMap, forMember, mapFrom, Mapper
} from '@automapper/core'
import Group from '../../model/entities/Group'
import GroupHttpEntity from '../../model/httpEntites/group/GroupHttpEntity'
import GroupCreateUpdateHttpEntity from '../../model/httpEntites/group/GroupCreateUpdateHttpEntity'

/**
 * Define group mappers
 * @param mapper mapper object
 */
export default (mapper: Mapper) => {
  /**
   * Map to transform {@link Group} into {@link GroupHttpEntity}
   */
  createMap(
    mapper,
    Group,
    GroupHttpEntity,
    forMember((destination) => destination.description, mapFrom((source) => source.description))
  )

  /**
   * Map to transform {@link GroupCreateUpdateHttpEntity} into {@link Group}
   */
  createMap(
    mapper,
    GroupCreateUpdateHttpEntity,
    Group,
    forMember((destination) => destination.name, mapFrom(
      (source) => (source.name.trim())
    )),
    forMember((destination) => destination.description, mapFrom(
      (source) => (source.description?.trim() ? source.description.trim() : null)
    ))
  )
}
