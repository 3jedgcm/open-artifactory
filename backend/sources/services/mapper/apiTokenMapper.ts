import {
  createMap, forMember, mapFrom, Mapper
} from '@automapper/core'
import ApiToken from '../../model/entities/ApiToken'
import ApiTokenHttpEntity from '../../model/httpEntites/apiToken/ApiTokenEntity'
import ApiTokenCreateHttpEntity from '../../model/httpEntites/apiToken/ApiTokenCreateEntity'
import ApiTokenEditHttpEntity from '../../model/httpEntites/apiToken/ApiTokenEditEntity'

/**
 * Define api token mappers
 * @param mapper mapper object
 */
export default (mapper: Mapper) => {
  /**
   * Map to transform {@link ApiToken} into {@link ApiTokenHttpEntity}
   */
  createMap(
    mapper,
    ApiToken,
    ApiTokenHttpEntity,
    forMember((destination) => destination.description, mapFrom((source) => source.description)),
    forMember((destination) => destination.expireAt, mapFrom((source) => source.expireAt)),
    forMember((destination) => destination.isValid, mapFrom((source) => source.isValid))
  )

  /**
   * Map to transform {@link ApiTokenCreateHttpEntity} into {@link ApiToken}
   */
  createMap(
    mapper,
    ApiTokenCreateHttpEntity,
    ApiToken,
    forMember((destination) => destination.name, mapFrom(
      (source) => (source.name.trim())
    )),
    forMember(
      (destination) => destination.description,
      mapFrom((source) => (source.description?.trim() ? source.description.trim() : null))
    ),
    forMember((destination) => destination.expireAt, mapFrom((source) => (source.expireAt ?? null)))
  )

  /**
   * Map to transform {@link ApiTokenEditHttpEntity} into {@link ApiToken}
   */
  createMap(
    mapper,
    ApiTokenEditHttpEntity,
    ApiToken,
    forMember((destination) => destination.name, mapFrom(
      (source) => (source.name.trim())
    )),
    forMember(
      (destination) => destination.description,
      mapFrom((source) => (source.description?.trim() ? source.description.trim() : null))
    )
  )
}
