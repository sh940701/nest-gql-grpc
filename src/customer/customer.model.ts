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

    @Field({nullable: true})
    @Column('varchar', {length: 15, nullable: true})
    phone: string

    @Field({nullable: true})
    @Column('text', {nullable: true})
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
