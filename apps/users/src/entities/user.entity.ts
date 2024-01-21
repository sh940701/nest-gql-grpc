import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 500, nullable: false})
    name: string

    @Column('text', {nullable: false})
    email: string

    @Column('varchar', {length: 15, nullable: true})
    phone: string

    @Column('text', {nullable: true})
    address: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}

export class CreateUserDTO {
    name: string
    email: string
    phone: string
    address: string
}
