import { CreateDto } from '@koakh/nestjs-surrealdb-driver';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  create(@Body() createDto: CreateDto): any {
    return this.appService.postCreate(createDto);
  }

}
