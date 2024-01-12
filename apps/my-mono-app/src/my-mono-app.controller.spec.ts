import { Test, TestingModule } from '@nestjs/testing';
import { MyMonoAppController } from './my-mono-app.controller';
import { MyMonoAppService } from './my-mono-app.service';

describe('MyMonoAppController', () => {
  let myMonoAppController: MyMonoAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MyMonoAppController],
      providers: [MyMonoAppService],
    }).compile();

    myMonoAppController = app.get<MyMonoAppController>(MyMonoAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(myMonoAppController.getHello()).toBe('Hello World!');
    });
  });
});
