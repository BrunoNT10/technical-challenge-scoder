import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getStandardRoute(): Record<string, string> {
    return this.appService.getStandardRoute();
  }
}