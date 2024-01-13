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

@Controller()
export class UsersController {
    @GrpcMethod('UsersService')
    findOne(data: UserById, metadata?: Metadata, call?: ServerUnaryCall<any, any>) {
        const items = [
            {id: 1, name: 'John'},
            {id: 2, name: 'Do'}
        ]

        return items.find(({id}) => id === data.id) as any
    }
}
