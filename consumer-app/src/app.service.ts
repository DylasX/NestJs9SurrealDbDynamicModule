import { ChangeDto, CreateDto, ModifyDto, Signin, Signup, SurrealDbService } from '@koakh/nestjs-surrealdb';
import { SurrealDbResponseDto } from '@koakh/nestjs-surrealdb/dist/surrealdb/dto/surrealdb-response.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly db: SurrealDbService) {}

  async thingExists(thing: string): Promise<void> {
    if (!await this.db.select(thing)) {
      // mimic surrealdb response
      throw new Error(`Record not found: ${thing}`);
    }
  }

  async postConnect(url: string): Promise<any> {
    return this.db.connect(url);
  }

  async postClose(): Promise<any> {
    return this.db.close();
  }

  async postUse(ns: string, db: string): Promise<any> {
    return this.db.use(ns, db);
  }

  async postSignup(vars: Signup): Promise<any> {
    return this.db.signup(vars);
  }

  async postSignin(vars: Signin): Promise<any> {
    return this.db.signin(vars);
  }

  async postInvalidate(): Promise<any> {
    return this.db.invalidate();
  }

  async postAuthenticate(token: string): Promise<any> {
    return this.db.authenticate(token);
  }

  async postLet(key: string, val: any): Promise<any> {
    return this.db.let(key, val);
  }

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
    await this.thingExists(thing);
    return this.db.update(thing, data);
  }

  async patchChange(thing: string, data: ChangeDto): Promise<any> {
    await this.thingExists(thing);
    return this.db.change(thing, data);
  }

  async patchModify(thing: string, data: ModifyDto): Promise<any> {
    await this.thingExists(thing);
    return this.db.modify(thing, data);
  }

  async deleteDelete(thing: string): Promise<any> {
    await this.thingExists(thing);
    return this.db.delete(thing);
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
    return this.db.kill(query);
  }

  // orm/model mode

  // async postCreateModel(createPersonDto: CreatePersonDto): Promise<SurrealDbResponseDto> {
  //   const person = new PersonModel(this.db, createPersonDto);
  //   // TODO: clean some tests or create some endpoints for it
  //   // Logger.log(JSON.stringify(person), AppService.name);
  //   // return person.props();
  //   // return person.showProperties();
  //   // return { message: await person.save() };
  //   return person.create(true);
  // }

  // async getSelectModelByThing(thing: string): Promise<Person> {
  //   // this will throw if model not exists, and don't advance to new model
  //   const result = await this.getSelect(thing);
  //   // return model instance
  //   return new PersonModel(this.db, result[0]);
  // }
}