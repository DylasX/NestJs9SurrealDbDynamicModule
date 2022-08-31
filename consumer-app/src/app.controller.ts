import { QueryDto, LetDto, AuthenticateDto, SigninDto, SignupDto, UseDto, CreateDto, ChangeDto, ConnectDto, SelectDto } from '@koakh/nestjs-surrealdb-driver';
import { SurrealDbResponseDto } from '@koakh/nestjs-surrealdb-driver/dist/surrealdb/dto/surrealdb-response.dto';
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

  @Post('/connect')
  connect(@Body() { url }: ConnectDto): any {
    return this.appService.postConnect(url);
  }

  @Post('/close')
  close(): any {
    return this.appService.postClose();
  }

  @Post('/use')
  use(@Body() { ns, db }: UseDto): any {
    return this.appService.postUse(ns, db);
  }

  @Post('/signup')
  signup(@Body() signupDto: SignupDto): any {
    return this.appService.postSignup(signupDto);
  }

  @Post('/signin')
  signin(@Body() signinDto: SigninDto): any {
    return this.appService.postSignin(signinDto);
  }

  @Post('/invalidate')
  invalidate(): any {
    return this.appService.postInvalidate();
  }

  @Post('/authenticate')
  authenticate(@Body() { token }: AuthenticateDto): any {
    return this.appService.postAuthenticate(token);
  }

  @Post('/let')
  let(@Body() { key, val }: LetDto): Promise<void> {
    return this.appService.postLet(key, val);
  }

  @Post('/query')
  async query(@Body() { sql, vars }: QueryDto): Promise<SurrealDbResponseDto> {
    return this.appService.postQuery(sql, vars);
  }




  @Post()
  create(@Body() createDto: CreateDto): any {
    return this.appService.postCreate(createDto);
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
