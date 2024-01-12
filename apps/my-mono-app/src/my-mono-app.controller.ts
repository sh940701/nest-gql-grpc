import { Controller, Get } from '@nestjs/common';
import { MyMonoAppService } from './my-mono-app.service';

@Controller()
export class MyMonoAppController {
  constructor(private readonly myMonoAppService: MyMonoAppService) {}

  @Get()
  getHello(): string {
    return this.myMonoAppService.getHello();
  }
}
