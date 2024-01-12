import { NestFactory } from '@nestjs/core';
import { MyMonoAppModule } from './my-mono-app.module';

async function bootstrap() {
  const app = await NestFactory.create(MyMonoAppModule);
  await app.listen(3000);
}
bootstrap();
