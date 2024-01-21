import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver} from "@nestjs/apollo";
import {CustomerModule} from "./customer/customer.module";
import {AppService} from "./app.service";

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            driver: ApolloDriver
        }),
        CustomerModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
