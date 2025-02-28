import { All, Controller, Get, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('greeting')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @All('/hi')
  getHi(): string {
    return 'hi';
  }
}
