import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {Inject} from "@nestjs/common";
import {CustomerService} from "./customer.service";
import {User} from "./customer.model";
import {CreateUserDTO} from "../../../users/src/entities/user.entity";

@Resolver(() => User)
export class CustomerResolver {
    constructor(
        @Inject(CustomerService) private customerService: CustomerService,
    ) {
    }

    @Query(() => User)
    user(@Args('id') id: string) {
        return this.customerService.getUser({id})
    }


    @Query(() => [User])
    async users() {
        // console.log(data)
        return await this.customerService.getUsers()
    }

    @Mutation(() => User)
    createUser(
        @Args('name') name: string,
        @Args('email') email: string,
        @Args('phone', {nullable: true}) phone: string,
        @Args('address', {nullable: true}) address: string
    ) {
        const userData = new CreateUserDTO()
        userData.name = name
        userData.email = email
        userData.phone = phone
        userData.address = address

        return this.customerService.createUser(userData)
    }
}
