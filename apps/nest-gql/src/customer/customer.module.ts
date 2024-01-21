import {Module} from "@nestjs/common";
import {CustomerService} from "./customer.service";
import {CustomerResolver} from "./customer.resolver";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {join} from "path";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'USERS_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: "users",
                    protoPath: join(__dirname, './user.proto'),
                    // url 의 경우 local 에서 실행할 때는 설정해주지 않아도 된다.
                    // 그러나 docker compose 등으로 실행하거나, 외부에서의 grpc 테스트를 위해선 명시해줄 필요가 있다.
                    url: process.env.USER_SERVICE_URL
                }
            }
        ]),
    ],
    providers: [CustomerService, CustomerResolver]
})
export class CustomerModule {
}
