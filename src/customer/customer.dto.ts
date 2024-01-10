import {InputType} from "@nestjs/graphql";

@InputType()
export class CustomerDTO {
    name: string
    email: string
    phone: string
    address: string
}
