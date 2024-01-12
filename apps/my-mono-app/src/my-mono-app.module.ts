import { Module } from '@nestjs/common';
import { MyMonoAppController } from './my-mono-app.controller';
import { MyMonoAppService } from './my-mono-app.service';

@Module({
  imports: [],
  controllers: [MyMonoAppController],
  providers: [MyMonoAppService],
})
export class MyMonoAppModule {}
