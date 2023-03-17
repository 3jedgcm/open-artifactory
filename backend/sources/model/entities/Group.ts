import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { AutoMap } from '@automapper/classes'
// eslint-disable-next-line import/no-cycle
import File from './File'

/**
 * Badge entity
 */
@Entity()
export default class Group {
  /**
   * Database id
   */
  @PrimaryGeneratedColumn('increment')
  @AutoMap()
    id!: number

  /**
   * Group name
   */
  @Column('text', {
    unique: true
  })
  @AutoMap()
    name!: string

  /**
   * Group description
   */
  @Column({
    type: 'text',
    nullable: true
  })
  @AutoMap()
    description!: string | null

  /**
   * Group creation date
   */
  @CreateDateColumn()
  @AutoMap()
    createdAt!: Date

  /**
   * Group updating date
   */
  @UpdateDateColumn()
  @AutoMap()
    updateAt!: Date

  /**
   * Group file list
   */
  @OneToMany(() => File, (file) => file.group)
  @AutoMap()
    files!: File[]
}
