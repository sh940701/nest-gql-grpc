import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {UserById, UsersController} from "../../../users/src/users.controller";
import {ClientGrpc} from "@nestjs/microservices";
import {CreateUserDTO, UserEntity} from "apps/users/src/entities/user.entity";

@Injectable()
export class CustomerService implements OnModuleInit {
    private usersController: UsersController

    constructor(@Inject("USERS_PACKAGE") private client: ClientGrpc) {
    }

    onModuleInit() {
        this.usersController = this.client.getService<UsersController>('UsersService')
    }

    async getUsers() {
        const dataObservable = await this.usersController.findAll({});

        const usersPromise = new Promise((resolve, reject) => {
            dataObservable.subscribe({
                next: data => {
                    console.log(data)
                    resolve(data)
                }, error: err => {
                    reject(err)
                }
            })
        })

        const {users} = await usersPromise as { users: UserEntity[] }

        return users.map(user => ({...user, createdAt: new Date(user.createdAt), updatedAt: new Date(user.updatedAt)}))
    }

    async getUser(data: UserById) {
        const dataObservable = await this.usersController.findOne(data)

        const usersPromise = new Promise((resolve, reject) => {
            dataObservable.subscribe({
                next: data => {
                    console.log(data)
                    resolve(data)
                }, error: err => {
                    reject(err)
                }
            })
        })
        const result = await usersPromise as UserEntity
        return {...result, createdAt: new Date(result.createdAt), updatedAt: new Date(result.updatedAt)}
    }

    createUser(data: CreateUserDTO) {
        const result = this.usersController.insertOne(data)
        return result
    }

}
