import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'terin',
        password: 'abc',
        database: 'invoiceapp',
        entities: ['dist/**/*.model.js'],
        synchronize: true
    }),],
    controllers: [UsersController]
})
export class UsersModule {
}
