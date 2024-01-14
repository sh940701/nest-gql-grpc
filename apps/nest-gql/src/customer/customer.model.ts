import {Field, ObjectType} from "@nestjs/graphql";

// gql gateway 의 entity 파일에는 graphql 관련 decorator 만 남겨놓음
@ObjectType()
export class User {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    email: string

    @Field({nullable: true})
    phone: string

    @Field({nullable: true})
    address: string

    @Field()
    created_at: Date

    @Field()
    updated_at: Date
}
