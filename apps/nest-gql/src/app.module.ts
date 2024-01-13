import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GraphQLModule} from "@nestjs/graphql";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ApolloDriver} from "@nestjs/apollo";
import {CustomerModule} from "./customer/customer.module";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {join} from 'path'

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            driver: ApolloDriver
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'terin',
            password: 'abc',
            database: 'invoiceapp',
            entities: ['dist/**/*.model.js'],
            synchronize: true
        }),
        ClientsModule.register([
            {
                name: 'USERS_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: "users",
                    protoPath: join(__dirname, 'users/user.proto')
                }
            }
        ]),
        CustomerModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
