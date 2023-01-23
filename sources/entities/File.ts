import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export default class File {
    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column("uuid")
    uuid!: string
    
    @Column("text")
    name!: string

    @Column("text")
    path!: string

    @Column("number")
    size!: number

    @Column("number")
    downloadCount!: number

    @CreateDateColumn("date")
    createdAt!: Date

}