import { ChangeDto, CreateDto, Signin, Signup, SurrealDbService } from '@koakh/nestjs-surrealdb';
import { SurrealDbResponseDto } from '@koakh/nestjs-surrealdb/dist/surrealdb/dto/surrealdb-response.dto';
import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto';
import { Person, PersonModel } from './models';

@Injectable()
export class AppService {
  private helloMessage: string;

  constructor(private db: SurrealDbService) {
    this.helloMessage = db.get('HELLO_MESSAGE');
  }

  async getHello(): Promise<{ message: string; }> {
    return { message: this.helloMessage };
  }

  async thingExists(thing: string): Promise<void> {
    if (!await this.db.select(thing)) {
      // mimic surrealdb response
      throw new Error(`Record not found: ${thing}`);
    }
  }

  async postConnect(url: string): Promise<any> {
    return this.db.connect(url);
  }

  // TODO: add to controller
  async postClose(): Promise<any> {
    return this.db.close();
  }

  // TODO: add to controller
  async postUse(ns: string, db: string): Promise<any> {
    return this.db.use(ns, db);
  }

  // TODO: add to controller
  async postSignup(vars: Signup): Promise<any> {
    return this.db.signup(vars);
  }

  // TODO: add to controller
  async postSignin(vars: Signin): Promise<any> {
    return this.db.signin(vars);
  }

  // TODO: add to controller
  async postInvalidate(): Promise<any> {
    return this.db.invalidate();
  }

  // TODO: add to controller
  async postAuthenticate(token: string): Promise<any> {
    return this.db.authenticate(token);
  }

  // TODO: add to controller
  async postLet(key: string, val: any): Promise<any> {
    return this.db.let(key, val);
  }

  // TODO: add to controller
  async postQuery(sql: string, vars?: any): Promise<SurrealDbResponseDto> {
    return this.db.query(sql, vars);
  }

  async getSelect(thing: string): Promise<any> {
    return this.db.select(thing);
  }

  async postCreate(createDto: CreateDto): Promise<any> {
    return this.db.create((createDto as any).id, { ...createDto, id: undefined });
  }

  async putUpdate(thing: string, data: ChangeDto): Promise<any> {
    return await this.thingExists(thing);
  }

  async patchChange(thing: string, data: ChangeDto): Promise<any> {
    return await this.thingExists(thing);
  }

  async patchModify(thing: string, data: ChangeDto): Promise<any> {
    return await this.thingExists(thing);
  }

  async deleteDelete(thing: string): Promise<any> {
    return await this.thingExists(thing);
  }

  async postSync(query: string, vars: any): Promise<any> {
    return this.db.sync(query, vars);
  }

  async postPing(): Promise<any> {
    return this.db.ping();
  }

  async postInfo(): Promise<any> {
    return this.db.info();
  }

  async postLive(table: string): Promise<any> {
    return this.db.live(table);
  }

  async postKill(query: string): Promise<any> {
    return this.db.live(query);
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