import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {CustomerModel} from "./customer.model";
import {Inject} from "@nestjs/common";
import {CustomerService} from "./customer.service";

@Resolver(of => CustomerModel)
export class CustomerResolver {
    constructor(
        @Inject(CustomerService) private customerService: CustomerService,
    ) {
    }

    @Query(returns => CustomerModel)
    async customer(@Args('id') id: string): Promise<CustomerModel> {
        return await this.customerService.findOne(id)
    }


    @Query(returns => [CustomerModel])
    async customers(): Promise<CustomerModel[]> {
        return await this.customerService.findAll()
    }

    @Mutation(returns => CustomerModel)
    async createCustomer(
        @Args('name') name: string,
        @Args('email') email: string,
        @Args('phone', {nullable: true}) phone: string,
        @Args('address', {nullable: true}) address: string
    ): Promise<CustomerModel> {
        return await this.customerService.create({name, email, phone, address})
    }
}
