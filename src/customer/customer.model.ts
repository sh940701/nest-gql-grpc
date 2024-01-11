import {Field, ObjectType} from "@nestjs/graphql";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@ObjectType()
@Entity()
export class CustomerModel {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column({length: 500, nullable: false})
    name: string

    @Field()
    @Column('text', {nullable: false})
    email: string

    @Field()
    @Column('varchar', {length: 15})
    phone: string

    @Field()
    @Column('text')
    address: string

    @Field()
    @Column()
    @CreateDateColumn()
    created_at: Date

    @Field()
    @Column()
    @UpdateDateColumn()
    updated_at: Date
}
