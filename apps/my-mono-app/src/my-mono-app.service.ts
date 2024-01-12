import { Injectable } from '@nestjs/common';

@Injectable()
export class MyMonoAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
