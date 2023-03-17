import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import path from 'path'
import { AutoMap } from '@automapper/classes'
import constants from '../../constants'
import { Uuid } from '../httpEntites/primitivesHttpEnties'
// eslint-disable-next-line import/no-cycle
import Group from './Group'
// eslint-disable-next-line import/no-cycle
import Badge from './Badge'

/**
 * File entity
 */
@Entity()
export default class File {
  /**
   * Database id
   */
  @PrimaryGeneratedColumn('increment')
    id!: number

  /**
   * File uuid
   */
  @Column()
  @Generated('uuid')
  @AutoMap()
    uuid!: Uuid

  /**
   * File name
   */
  @Column('text')
  @AutoMap()
    name!: string

  /**
   * File comment
   */
  @Column({
    type: 'text',
    nullable: true
  })
  @AutoMap()
    comment!: string | null

  /**
   * Mime type
   */
  @Column('text')
  @AutoMap()
    mimeType!: string

  /**
   * Size (in bytes)
   */
  @Column('numeric')
  @AutoMap()
    size!: number

  /**
   * Checksum MD5 hash
   */
  @Column('text')
  @AutoMap()
    hash!: string

  /**
   * Download count
   */
  @Column('numeric', { default: 0 })
  @AutoMap()
    downloadCount!: number

  /**
   * File upload date
   */
  @CreateDateColumn()
  @AutoMap()
    createdAt!: Date

  /**
   * File updating date
   */
  @UpdateDateColumn()
  @AutoMap()
    updateAt!: Date

  /**
   * File group
   */
  @ManyToOne(() => Group, (group) => group.files, { nullable: true })
  @AutoMap()
    group!: Group | null

  /**
   * File badge list
   */
  @ManyToMany(() => Badge, (badge) => badge.files)
  @JoinTable()
  @AutoMap()
    badges!: Badge[]

  /**
   * File path
   */
  get path(): string {
    return path.join(constants.filesFolderPath, this.uuid)
  }

  /**
   * File URL
   */
  get url(): string {
    return `${constants.baseUrl}files/${this.uuid}`
  }
}
