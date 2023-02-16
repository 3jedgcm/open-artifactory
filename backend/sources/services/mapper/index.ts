import {
  createMap, createMapper, forMember, mapFrom
} from '@automapper/core'
import { classes } from '@automapper/classes'
import File from '../../model/entities/File'
import FileHttpEntity from '../../model/httpEntites/FileHttpEntity'
import FileUpdateHttpEntity from '../../model/httpEntites/FileUpdateHttpEntity'

/**
 * File mapper
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
    (source) => (source.comment && source.comment.trim() ? source.comment : null)
  ))
)

export default mapper
