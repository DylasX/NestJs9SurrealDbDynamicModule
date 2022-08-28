import { CreateDto, SurrealDbService } from '@koakh/nestjs-surrealdb-driver';
import { Injectable } from '@nestjs/common';

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

}
