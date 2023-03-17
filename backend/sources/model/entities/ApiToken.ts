import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn
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
   * Token description
   */
  @Column({
    type: 'text',
    nullable: true
  })
  @AutoMap()
    description!: string | null

  /**
   * Token expiration date (Can be null, never expire in this case)
   */
  @Column({
    type: 'datetime',
    nullable: true
  })
  @AutoMap()
    expireAt!: Date | null

  /**
   * Token creation date
   */
  @CreateDateColumn()
  @AutoMap()
    createdAt!: Date

  /**
   * Token updating date
   */
  @UpdateDateColumn()
  @AutoMap()
    updateAt!: Date

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
