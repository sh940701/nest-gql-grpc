import {Controller} from '@nestjs/common';
import {UsersService} from './users.service';
import {GrpcMethod} from "@nestjs/microservices";
import {Metadata, ServerUnaryCall} from "@grpc/grpc-js";

@Controller()
export class UsersController {
    @GrpcMethod('UsersService', 'FindOne')
    findOne(data: UserById, metadata: Metadata, call: ServerUnaryCall<any, any>): User {
        const items = [
            {id: 1, name: 'John'},
            {id: 2, name: 'Do'}
        ]

        return items.find(({id}) => id === data.id)
    }
}
