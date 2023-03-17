import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
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
export default class Badge {
  /**
   * Database id
   */
  @PrimaryGeneratedColumn('increment')
  @AutoMap()
    id!: number

  /**
   * Badge name
   */
  @Column('text', {
    unique: true
  })
  @AutoMap()
    name!: string

  /**
   * Badge color
   */
  @Column('text', { default: '#EDF2F7' })
  @AutoMap()
    color!: string

  /**
   * Badge description
   */
  @Column({
    type: 'text',
    nullable: true
  })
  @AutoMap()
    description!: string | null

  /**
   * Badge creation date
   */
  @CreateDateColumn()
  @AutoMap()
    createdAt!: Date

  /**
   * Badge updating date
   */
  @UpdateDateColumn()
  @AutoMap()
    updateAt!: Date

  /**
   * Badge file list
   */
  @ManyToMany(() => File, (file) => file.badges)
  @AutoMap()
    files!: File[]
}
