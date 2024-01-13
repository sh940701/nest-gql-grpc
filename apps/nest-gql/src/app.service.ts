import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {UserById, UsersController} from "../../users/src/users.controller";
import {ClientGrpc} from "@nestjs/microservices";

@Injectable()
export class AppService implements OnModuleInit {
    // 아래와 같이 service layer 에서 세팅해줘도 됨
    // @Client({
    //     transport: Transport.GRPC,
    //     options: {
    //         package: 'users',
    //         protoPath: join(__dirname, '../users/user.proto'),
    //         // url: '0.0.0.0:50001'
    //     }
    // })
    // private client: ClientGrpc

    private usersController: UsersController

    constructor(@Inject('USERS_PACKAGE') private client: ClientGrpc) {
    }

    onModuleInit() {
        this.usersController = this.client.getService<UsersController>('UsersService')
    }

    getUser(data: UserById) {
        return this.usersController.findOne(data)
    }

    getUsers() {
        return this.usersController.findAll()
    }

    getHello() {
        return 'hello, world'
    }
}
