import {Controller, Get, Param} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('/users')
    getUsers() {
        return this.appService.getUsers()
    }

    @Get('/users/:_id')
    getUser(@Param('_id') id: string) {
        return this.appService.getUser({id: Number(id)})
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
