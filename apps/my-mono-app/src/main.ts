import {NestFactory} from '@nestjs/core';
import {MyMonoAppModule} from './my-mono-app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {join} from 'path'

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(MyMonoAppModule, {
        transport: Transport.GRPC,
        options: {
            package: 'user',
            protoPath: join(__dirname, 'my-mono-app/user.proto')
        }
    });
    await app.listen();
}

bootstrap().catch(console.error);
