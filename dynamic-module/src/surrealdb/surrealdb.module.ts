import { DynamicModule, Module } from '@nestjs/common';
import { SurrealDbService } from './surrealdb.service';
import { SURREALDB_OPTIONS } from './constants';
import { SurrealDbOptions } from './interfaces';

type SurrealDbModuleOptions = SurrealDbOptions;

@Module({})
export class SurrealDbModule {
  static register(options: SurrealDbModuleOptions): DynamicModule {
    return {
      module: SurrealDbModule,
      providers: [
        {
          provide: SURREALDB_OPTIONS,
          useValue: options,
        },
        SurrealDbService,
      ],
      exports: [SurrealDbService],
    };
  }
}
