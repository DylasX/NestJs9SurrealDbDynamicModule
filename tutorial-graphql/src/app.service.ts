import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly db: SurrealDbService) {}

  async getSelect(thing: string): Promise<any> {
    return this.db.select(thing);
  }

}
