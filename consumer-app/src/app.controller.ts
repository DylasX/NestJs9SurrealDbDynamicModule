import { CreateDto } from '@koakh/nestjs-surrealdb-driver';
import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePersonDto } from './dto';
import { PersonModel } from './models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): { message: string } {
    return this.appService.getHello();
  }

  @Post()
  create(@Body() createDto: CreateDto): any {
    return this.appService.postCreate(createDto);
  }

  @Post('/person')
  createPerson(@Body() createPersonDto: CreatePersonDto): any {
    return this.appService.postCreateModel(createPersonDto);
  }

}
