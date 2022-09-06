import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly db: SurrealDbService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
