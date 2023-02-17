import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn
} from 'typeorm'
import { AutoMap } from '@automapper/classes'

/**
 * Api token entity
 */
@Entity()
export default class ApiToken {
  /**
   * Database id
   */
  @PrimaryGeneratedColumn('increment')
  @AutoMap()
    id!: number

  /**
   * Token hashed key
   */
  @Column()
    hash!: string

  /**
   * Token name
   */
  @Column('text')
  @AutoMap()
    name!: string

  /**
   * Token comment
   */
  @Column({
    type: 'text',
    transformer: {
      to(value) {
        return value || ''
      },
      from(value) {
        return value || null
      }
    }
  })
    comment!: string | null

  /**
   * Token expiration date (Can be null, never expire in this case)
   */
  @Column({
    type: 'date',
    nullable: true,
    default: undefined
  })
  @AutoMap()
    expireAt?: Date

  /**
   * Token creation date
   */
  @CreateDateColumn()
  @AutoMap()
    createdAt!: Date

  /**
   * Token status
   */
  get isValid(): boolean {
    if (this.expireAt) {
      return this.expireAt >= new Date()
    }
    return true
  }
}
