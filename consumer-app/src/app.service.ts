import { CreateDto, ChangeDto, SelectDto, SurrealDbService } from '@koakh/nestjs-surrealdb-driver';
import { SurrealDbResponseDto } from '@koakh/nestjs-surrealdb-driver/dist/surrealdb/dto/surrealdb-response.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto';
import { Person, PersonModel } from './models';

@Injectable()
export class AppService {
  private helloMessage: string;

  constructor(private db: SurrealDbService) {
    this.helloMessage = db.get('HELLO_MESSAGE');
  }

  getHello(): { message: string } {
    return { message: this.helloMessage };
  }

  async postCreate(thing: string, createDto: CreateDto): Promise<any> {
    try {
      return await this.db.create(thing, createDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getSelect(thing: string): Promise<any> {
    // TODO: leave for all exception filter
    try {
      // TODO: required await else don't work
      return await this.db.select(thing);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async patchChange(thing: string, data: ChangeDto): Promise<any> {
    try {
      return await this.db.change(thing, data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteDelete(thing: string): Promise<any> {
    try {
      return await this.db.delete(thing);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async postCreateModel(createPersonDto: CreatePersonDto): Promise<SurrealDbResponseDto> {
    const person = new PersonModel(this.db, createPersonDto);
    // TODO: clean some tests or create some endpoints for it
    // Logger.log(JSON.stringify(person), AppService.name);
    // return person.props();
    // return person.showProperties();
    // return { message: await person.save() };
    return person.create(true);
  }

  async getSelectModelByThing(thing: string): Promise<Person> {
    // this will throw if model not exists, and don't advance to new model
    const result = await this.getSelect(thing);
    // return model instance
    return new PersonModel(this.db, result[0]);
  }

}
