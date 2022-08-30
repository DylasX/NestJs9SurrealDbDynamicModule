import { Signin, Signup, CreateDto, ChangeDto, SelectDto, SurrealDbService } from '@koakh/nestjs-surrealdb-driver';
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

  // TODO: remove
  getHello(): { message: string } {
    return { message: this.helloMessage };
  }

  async thingExists(thing: string): Promise<void> {
    if (!await this.db.select(thing)) {
      // mimic surrealdb response
      throw new Error(`Record not found: ${thing}`);
    }
  }

  // TODO: add to controller
  async postConnect(url: string): Promise<any> {
    try {
      return await this.db.connect(url);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // TODO: add to controller
  async postClose(): Promise<any> {
    try {
      return await this.db.close();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // TODO: add to controller
  async postUse(ns: string, db: string): Promise<any> {
    try {
      return await this.db.use(ns, db);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // TODO: add to controller
  async postSignup(vars: Signup): Promise<any> {
    try {
      return await this.db.signup(vars);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // TODO: add to controller
  async postSignin(vars: Signin): Promise<any> {
    try {
      return await this.db.signin(vars);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // TODO: add to controller
  async postInvalidate(): Promise<any> {
    try {
      return await this.db.invalidate();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // TODO: add to controller
  async postAuthenticate(token: string): Promise<any> {
    try {
      return await this.db.authenticate(token);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // TODO: add to controller
  async postLet(key: string, val: any): Promise<any> {
    try {
      return await this.db.let(key, val);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // TODO: add to controller
  async postQuery(sql: string, vars: any): Promise<any> {
    try {
      return await this.db.query(sql, vars);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getSelect(thing: string): Promise<any> {
    try {
      return await this.db.select(thing);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async postCreate(thing: string, createDto: CreateDto): Promise<any> {
    try {
      return await this.db.create(thing, createDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async putUpdate(thing: string, data: ChangeDto): Promise<any> {
    try {
      await this.thingExists(thing);
      return await this.db.update(thing, data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // TODO: use it ? put, patch ?
  async patchChange(thing: string, data: ChangeDto): Promise<any> {
    try {
      await this.thingExists(thing);
      return await this.db.change(thing, data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async patchModify(thing: string, data: ChangeDto): Promise<any> {
    try {
      await this.thingExists(thing);
      return await this.db.modify(thing, data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteDelete(thing: string): Promise<any> {
    try {
      await this.thingExists(thing);
      return await this.db.delete(thing);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async postSync(query: string, vars: any): Promise<any> {
    try {
      return await this.db.sync(query, vars);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async postPing(): Promise<any> {
    try {
      return await this.db.ping();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async postInfo(): Promise<any> {
    try {
      return await this.db.info();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async postLive(table: string): Promise<any> {
    try {
      return await this.db.live(table);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async postKill(query: string): Promise<any> {
    try {
      return await this.db.live(query);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // orm/model mode

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
