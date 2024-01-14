import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GraphQLModule} from "@nestjs/graphql";
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
        ClientsModule.register([
            {
                name: 'USERS_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: "users",
                    protoPath: join(__dirname, '../users/user.proto'),
                    // url 의 경우 local 에서 실행할 때는 설정해주지 않아도 된다.
                    // 그러나 docker compose 등으로 실행하거나, 외부에서의 grpc 테스트를 위해선 명시해줄 필요가 있다.
                    url: '0.0.0.0:50001'
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
