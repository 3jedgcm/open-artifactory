import { AutoMap } from '@automapper/classes'

export default class FileHttpEntity {
  @AutoMap()
    uuid!: string

  @AutoMap()
    name!: string

  @AutoMap()
    mineType!: string

  @AutoMap()
    size!: number

  @AutoMap()
    hash!: string

  @AutoMap()
    downloadCount!: number

  @AutoMap()
    createdAt!: Date

  url!: string
}
