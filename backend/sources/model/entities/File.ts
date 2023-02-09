import {
  Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn
} from 'typeorm'
import path from 'path'
import { AutoMap } from '@automapper/classes'
import constants from '../../constants'

@Entity()
export default class File {
  @PrimaryGeneratedColumn('increment')
    id!: number

  @Column()
  @Generated('uuid')
  @AutoMap()
    uuid!: string

  @Column('text')
  @AutoMap()
    name!: string

  @Column('text')
  @AutoMap()
    mineType!: string

  @Column('numeric')
  @AutoMap()
    size!: number

  @Column('text')
  @AutoMap()
    hash!: string

  @Column('numeric', { default: 0 })
  @AutoMap()
    downloadCount!: number

  @CreateDateColumn()
  @AutoMap()
    createdAt!: Date

  get path(): string {
    return path.join(constants.filesFolder, this.uuid)
  }

  get url() {
    return `${constants.baseUrl}files/${this.uuid}`
  }
}
