import {Inject, Injectable} from "@nestjs/common";
import {CustomerModel} from "./customer.model";
import {CustomerDTO} from "./customer.dto";
import {UserById, UsersController} from "../../../users/src/users.controller";
import {ClientGrpc} from "@nestjs/microservices";

@Injectable()
export class CustomerService {
    private usersController: UsersController

    constructor(@Inject("USERS_PACKAGE") private client: ClientGrpc) {
    }

    onModuleInit() {
        this.usersController = this.client.getService<UsersController>('UsersService')
    }

    getUsers() {
        return this.usersController.findAll({})
    }

    getUser(data: UserById) {
        return this.usersController.findOne(data)
    }

    createUser(data) {
        return this.usersController.insertOne(data)
    }

    // constructor(
    //     @InjectRepository(CustomerModel)
    //     private customerRepository: Repository<CustomerModel>
    // ) {
    // }

    create(details: CustomerDTO): Promise<CustomerModel> {
        return this.customerRepository.save(details)
    }

    findAll(): Promise<CustomerModel[]> {
        return this.customerRepository.find()
    }

    findOne(id: string): Promise<CustomerModel> {
        return this.customerRepository.findOne({where: {id}})
    }
}
