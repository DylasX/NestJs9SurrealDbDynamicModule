import { CreateDto, SurrealDbService } from '@koakh/nestjs-surrealdb-driver';
import { Injectable, Logger } from '@nestjs/common';
import { CreatePersonDto } from './dto';
import { PersonModel } from './models';

@Injectable()
export class AppService {
  private helloMessage: string;

  constructor(private surrealDbService: SurrealDbService) {
    this.helloMessage = surrealDbService.get('HELLO_MESSAGE');
  }

  getHello(): { message: string } {
    return { message: this.helloMessage };
  }

  postCreate(createDto: CreateDto): any {
    return this.surrealDbService.create('person', createDto);
  }

  async postCreateModel(createPersonDto: CreatePersonDto): Promise<any> {
    const person = new PersonModel(this.surrealDbService, createPersonDto);
    // Logger.log(JSON.stringify(person), AppService.name);
    // return person.props();
    // return person.showProperties();
    // return { message: await person.save() };
    return person.create();
  }
}
