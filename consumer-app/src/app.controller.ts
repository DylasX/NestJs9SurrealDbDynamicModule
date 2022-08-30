import { CreateDto, ChangeDto, SelectDto } from '@koakh/nestjs-surrealdb-driver';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePersonDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): { message: string } {
    return this.appService.getHello();
  }

  // raw surrealdb

  @Post('/:thing')
  create(@Param('thing') thing: string, @Body() createDto: CreateDto): any {
    return this.appService.postCreate(thing, createDto);
  }

  @Get('/:thing')
  select(@Param('thing') thing: string): any {
    return this.appService.getSelect(thing);
  }

  @Patch('/:thing')
  modifyPerson(@Param('thing') thing: string, @Body() changeDto: ChangeDto): any {
    return this.appService.patchChange(thing, changeDto);
  }

  @Delete('/:thing')
  delete(@Param('thing') thing: string): any {
    return this.appService.deleteDelete(thing);
  }

  // model

  @Post('/person')
  createPerson(@Body() createPersonDto: CreatePersonDto): any {
    return this.appService.postCreateModel(createPersonDto);
  }


  @Get('/person/:thing')
  selectModelByThing(@Param('thing') thing: string): any {
    return this.appService.getSelectModelByThing(thing);
  }

}
