import { AuthenticateDto, ChangeDto, ConnectDto, CreateDto, LetDto, ModifyDto, QueryDto, SigninDto, SignupDto, SyncDto, UpdateDto, UseDto } from '@koakh/nestjs-surrealdb';
import { SurrealDbResponseDto } from '@koakh/nestjs-surrealdb/dist/surrealdb/dto/surrealdb-response.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePersonDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

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

  @Get('/:thing')
  select(@Param('thing') thing: string): any {
    return this.appService.getSelect(thing);
  }

  @Post()
  create(@Body() createDto: CreateDto): any {
    return this.appService.postCreate(createDto);
  }

  @Put('/:thing')
  update(@Param('thing') thing: string, @Body() updateDto: UpdateDto): any {
    return this.appService.putUpdate(thing, updateDto);
  }

  @Patch('/modify/:thing')
  modify(@Param('thing') thing: string, @Body() modifyDto: ModifyDto): any {
    return this.appService.patchChange(thing, modifyDto);
  }

  @Patch('/:thing')
  modifyPerson(@Param('thing') thing: string, @Body() changeDto: ChangeDto): any {
    return this.appService.patchChange(thing, changeDto);
  }

  @Delete('/:thing')
  delete(@Param('thing') thing: string): any {
    return this.appService.deleteDelete(thing);
  }

  @Post('/sync')
  sync(@Body() { query, vars }: SyncDto): any {
    return this.appService.postSync(query, vars);
  }

  @Post('/ping')
  ping(): any {
    return this.appService.postPing();
  }

  @Post('/info')
  info(): any {
    return this.appService.postInfo();
  }

  @Post('/live')
  live(@Param('table') table: string): any {
    return this.appService.postLive(table);
  }

  @Post('/kill')
  kill(@Param('query') query: string): any {
    return this.appService.postKill(query);
  }

  // TODO: WIP model

  // @Post('/person')
  // createPerson(@Body() createPersonDto: CreatePersonDto): any {
  //   return this.appService.postCreateModel(createPersonDto);
  // }

  // @Get('/person/:thing')
  // selectModelByThing(@Param('thing') thing: string): any {
  //   return this.appService.getSelectModelByThing(thing);
  // }

}
