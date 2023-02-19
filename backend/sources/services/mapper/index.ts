import {
  createMap, createMapper, forMember, mapFrom
} from '@automapper/core'
import { classes } from '@automapper/classes'
import File from '../../model/entities/File'
import FileHttpEntity from '../../model/httpEntites/file/FileHttpEntity'
import FileUpdateHttpEntity from '../../model/httpEntites/file/FileUpdateHttpEntity'
import ApiToken from '../../model/entities/ApiToken'
import ApiTokenHttpEntity from '../../model/httpEntites/apiToken/ApiTokenEntity'
import ApiTokenCreateHttpEntity from '../../model/httpEntites/apiToken/ApiTokenCreateEntity'
import ApiTokenEditHttpEntity from '../../model/httpEntites/apiToken/ApiTokenEditEntity'

/**
 * Entity mapper
 * @see {@link Mapper} for usage
 */
const mapper = createMapper({ strategyInitializer: classes() })

/**
 * Map to transform {@link File} into {@link FileHttpEntity}
 */
createMap(
  mapper,
  File,
  FileHttpEntity,
  forMember((destination) => destination.url, mapFrom((source) => source.url)),
  forMember((destination) => destination.comment, mapFrom((source) => source.comment))
)
/**
 * Map to transform {@link FileUpdateHttpEntity} into {@link File}
 */

createMap(
  mapper,
  FileUpdateHttpEntity,
  File,
  forMember((destination) => destination.comment, mapFrom(
    (source) => (source.comment?.trim() ? source.comment.trim() : null)
  ))
)

/**
 * Map to transform {@link ApiToken} into {@link ApiTokenHttpEntity}
 */
createMap(
  mapper,
  ApiToken,
  ApiTokenHttpEntity,
  forMember((destination) => destination.comment, mapFrom((source) => source.comment)),
  forMember((destination) => destination.expireAt, mapFrom((source) => source.expireAt ?? null)),
  forMember((destination) => destination.isValid, mapFrom((source) => source.isValid))
)

/**
 * Map to transform {@link ApiTokenCreateHttpEntity} into {@link ApiToken}
 */
createMap(
  mapper,
  ApiTokenCreateHttpEntity,
  ApiToken,
  forMember(
    (destination) => destination.comment,
    mapFrom((source) => (source.comment?.trim() ? source.comment.trim() : null))
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
  forMember(
    (destination) => destination.comment,
    mapFrom((source) => (source.comment?.trim() ? source.comment.trim() : null))
  )
)

export default mapper
