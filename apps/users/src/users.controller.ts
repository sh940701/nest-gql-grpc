import {Controller} from '@nestjs/common';
import {GrpcMethod} from "@nestjs/microservices";
import {Metadata, ServerUnaryCall} from "@grpc/grpc-js";

export interface UserById {
    id: number
}

export interface User {
    id: number
    name: string
}

export interface Empty {
}

export interface Users {
    users: User[]
}

@Controller()
export class UsersController {
    items = [
        {id: 1, name: 'John'},
        {id: 2, name: 'Do'}
    ]

    @GrpcMethod('UsersService')
    findOne(data: UserById, metadata?: Metadata, call?: ServerUnaryCall<any, any>): User {
        return this.items.find(({id}) => id === data.id) as User
    }

    @GrpcMethod('UsersService')
    findAll(data: Empty, metadata?: Metadata, call?: ServerUnaryCall<any, any>): Users {
        return {users: this.items} as Users
    }
}
