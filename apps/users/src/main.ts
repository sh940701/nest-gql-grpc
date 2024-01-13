import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {AppModule} from "../../nest-gql/src/app.module";
import {join} from 'path'

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: 'users',
            protoPath: join(__dirname, 'users/user.proto')
        }
    });
    await app.listen();
}

bootstrap();
