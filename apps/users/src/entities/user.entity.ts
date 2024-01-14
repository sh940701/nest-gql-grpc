import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class UserEntity extends BaseEntity {
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

    @Column()
    @CreateDateColumn()
    created_at: Date

    @Column()
    @UpdateDateColumn()
    updated_at: Date
}
