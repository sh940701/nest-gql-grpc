import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {join} from 'path'
import {UsersModule} from "./users.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
        transport: Transport.GRPC,
        options: {
            package: 'users',
            protoPath: join(__dirname, 'user.proto'),
            // url 의 경우 local 에서 실행할 때는 설정해주지 않아도 된다.
            // 그러나 docker compose 등으로 실행하거나, 외부에서의 grpc 테스트를 위해선 명시해줄 필요가 있다.
            url: '0.0.0.0:50001'
        }
    });
    await app.listen();
}

bootstrap();
