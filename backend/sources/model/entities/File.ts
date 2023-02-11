import {
  Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn
} from 'typeorm'
import path from 'path'
import { AutoMap } from '@automapper/classes'
import constants from '../../constants'
import { Uuid } from '../httpEntites/primitivesHttpEnties'

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
   * Upload date
   */
  @CreateDateColumn()
  @AutoMap()
    createdAt!: Date

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
