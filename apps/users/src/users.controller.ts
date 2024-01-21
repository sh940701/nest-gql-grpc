import {Controller} from '@nestjs/common';
import {GrpcMethod} from "@nestjs/microservices";
import {Metadata, ServerUnaryCall} from "@grpc/grpc-js";
import {CreateUserDTO, UserEntity} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Observable} from "rxjs";

export interface UserById {
    id: string
}

export interface Empty {
}

@Controller()
export class UsersController {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {
    }

    @GrpcMethod('UsersService')
    async findOne(data: UserById, metadata?: Metadata, call?: ServerUnaryCall<any, any>) {
        const {id} = data
        return await this.userRepository.findOne({where: {id}}) as unknown as Observable<UserEntity>
    }

    @GrpcMethod('UsersService')
    async findAll(data: Empty, metadata?: Metadata, call?: ServerUnaryCall<any, any>) {
        const users = await this.userRepository.find()

        const result = {users}
        return result as unknown as Observable<{ users: UserEntity[] }>
    }

    @GrpcMethod('UsersService')
    async insertOne(data: CreateUserDTO, metadata?: Metadata, call?: ServerUnaryCall<any, any>) {
        return await this.userRepository.save(data)
    }
}
