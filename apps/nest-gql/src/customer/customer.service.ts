import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
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

}
