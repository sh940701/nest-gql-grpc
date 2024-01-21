import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'terin',
        password: 'abc',
        database: 'invoiceapp',
        entities: [UserEntity],
        synchronize: true
    }),
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UsersController]
})
export class UsersModule {
}
