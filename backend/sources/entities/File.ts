import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export default class File {
    @PrimaryGeneratedColumn('increment')
      id!: number

    @Column('text')
      uuid!: string

    @Column('text')
      name!: string

    @Column('text')
      path!: string

    @Column('numeric')
      size!: number

    @Column('text')
      hash!: string

    @Column('numeric', { default: 0 })
      downloadCount!: number

    @CreateDateColumn()
      createdAt!: Date
}
