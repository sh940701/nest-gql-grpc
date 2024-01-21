import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
    }),
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UsersController]
})
export class UsersModule {
}
