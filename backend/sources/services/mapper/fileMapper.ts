import {
  createMap, forMember, mapFrom, Mapper
} from '@automapper/core'
import File from '../../model/entities/File'
import FileHttpEntity from '../../model/httpEntites/file/FileHttpEntity'
import FileUpdateHttpEntity from '../../model/httpEntites/file/FileUpdateHttpEntity'

/**
 * Define mappers for file entity
 * @param mapper mapper entity
 */
export default (mapper: Mapper) => {
  /**
   * Map to transform {@link File} into {@link FileHttpEntity}
   */
  createMap(
    mapper,
    File,
    FileHttpEntity,
    forMember((destination) => destination.comment, mapFrom((source) => source.comment)),
    forMember((destination) => destination.url, mapFrom((source) => source.url)),
    forMember((destination) => destination.group, mapFrom((source) => source.group)),
    forMember((destination) => destination.badges, mapFrom((source) => source.badges))
  )

  /**
   * Map to transform {@link FileUpdateHttpEntity} into {@link File}
   */
  createMap(
    mapper,
    FileUpdateHttpEntity,
    File,
    forMember((destination) => destination.name, mapFrom(
      (source) => (source.name.trim())
    )),
    forMember((destination) => destination.comment, mapFrom(
      (source) => (source.comment?.trim() ? source.comment.trim() : null)
    )),
    forMember((destination) => destination.group, mapFrom(
      (source) => (source.groupId ? { id: source.groupId } : null)
    )),
    forMember((destination) => destination.badges, mapFrom(
      (source) => (source.badgeIds && source.badgeIds.length > 0
        ? source.badgeIds.map((id) => ({ id }))
        : [])
    ))
  )
}
