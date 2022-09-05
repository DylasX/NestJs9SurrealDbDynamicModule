import { DynamicModule, Module } from '@nestjs/common';
import { SURREALDB_CONFIG_OPTIONS } from './constants';
import { SurrealDbOptions } from './interfaces';
import SurrealDbAsyncOptions from './surrealdb.options.type';
import { SurrealDbService } from './surrealdb.service';

@Module({})
export class SurrealDbModule {
  static register(options: SurrealDbOptions): DynamicModule {
    return {
      module: SurrealDbModule,
      providers: [
        {
          provide: SURREALDB_CONFIG_OPTIONS,
          useValue: options,
        },
        SurrealDbService,
      ],
      exports: [SurrealDbService],
    };
  }
 
  static registerAsync(options: SurrealDbAsyncOptions): DynamicModule {
    return {
      module: SurrealDbModule,
      imports: options.imports,
      providers: [
        {
          provide: SURREALDB_CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        SurrealDbService,
      ],
      exports: [SurrealDbService],
    };
  }
}