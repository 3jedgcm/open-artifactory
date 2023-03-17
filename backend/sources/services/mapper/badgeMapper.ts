import {
  createMap, forMember, mapFrom, Mapper
} from '@automapper/core'
import Badge from '../../model/entities/Badge'
import BadgeHttpEntity from '../../model/httpEntites/badge/BadgeHttpEntity'
import BadgeCreateUpdateHttpEntity from '../../model/httpEntites/badge/BadgeCreateUpdateHttpEntity'

/**
 * Define badge mappers
 * @param mapper mapper object
 */
export default (mapper: Mapper) => {
  /**
   * Map to transform {@link Badge} into {@link BadgeHttpEntity}
   */
  createMap(
    mapper,
    Badge,
    BadgeHttpEntity,
    forMember((destination) => destination.description, mapFrom((source) => source.description))
  )

  /**
   * Map to transform {@link BadgeCreateUpdateHttpEntity} into {@link Badge}
   */
  createMap(
    mapper,
    BadgeCreateUpdateHttpEntity,
    Badge,
    forMember((destination) => destination.name, mapFrom(
      (source) => (source.name.trim())
    )),
    forMember((destination) => destination.color, mapFrom(
      (source) => (source.color.trim())
    )),
    forMember((destination) => destination.description, mapFrom(
      (source) => (source.description?.trim() ? source.description.trim() : null)
    ))
  )
}
