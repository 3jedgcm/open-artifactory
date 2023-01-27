import {
  createMap, createMapper, forMember, mapFrom
} from '@automapper/core'
import { classes } from '@automapper/classes'
import File from '../../model/entities/File'
import FileHttpEntity from '../../model/httpEntites/FileHttpEntity'
import FileUpdateHttpEntity from '../../model/httpEntites/FileUpdateHttpEntity'

const mapper = createMapper({ strategyInitializer: classes() })

createMap(
  mapper,
  File,
  FileHttpEntity,
  forMember((destination) => destination.url, mapFrom((source) => source.url))
)
createMap(mapper, FileUpdateHttpEntity, File)

export default mapper
