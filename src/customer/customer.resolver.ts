import {Args, Mutation, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {CustomerModel} from "./customer.model";
import {Inject} from "@nestjs/common";
import {InvoiceModel} from "../invoice/invoice.model";
import {CustomerService} from "./customer.service";

@Resolver(of => CustomerModel)
export class CustomerResolver {
    constructor(
        @Inject(CustomerService) private customerService: CustomerService,
        @Inject(InvoiceService) private invoiceService: InvoiceService
    ) {
    }

    @Query(returns => CustomerModel)
    async customer(@Args('id') id: string): Promise<CustomerModel> {
        return await this.customerService.findOne(id)
    }

    @ResolveField(returns => [InvoiceModel])
    async invoices(@Parent() customer: CustomerModel): Promise<InvoiceModel[]> {
        const {id} = customer
        return this.invoiceService.findByCustomer(id)
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
