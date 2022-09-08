import { DynamicModule, Global, Module } from '@nestjs/common';
import { SURREALDB_CONFIG_OPTIONS } from './constants';
import { SurrealDbOptions } from './interfaces';
import { ConfigurableSurrealDbModule } from './surrealdb.module-definition';
import SurrealDbAsyncOptions from './surrealdb.options.type';
import { SurrealDbService } from './surrealdb.service';

// @Module({
//   providers: [SurrealDbService],
//   exports: [SurrealDbService],
// })
// export class SurrealDbModule extends ConfigurableSurrealDbModule {}

@Module({})
export class SurrealDbModule extends ConfigurableSurrealDbModule {
  static forRoot(options: SurrealDbOptions): DynamicModule {
    return {
      module: SurrealDbModule,
      providers: [
        {
          // provide: SURREALDB_CONFIG_OPTIONS,
          // useValue: options,
          provide: SurrealDbService,
          useValue: new SurrealDbService(options),
        },
        SurrealDbService,
      ],
      exports: [SurrealDbService],
    };
  }
 
  static forRootAsync(options: SurrealDbAsyncOptions): DynamicModule {
    return {
      module: SurrealDbModule,
      imports: options.imports,
      providers: [
        {
          // provide: SURREALDB_CONFIG_OPTIONS,
          provide: SurrealDbService,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        SurrealDbService,
      ],
      exports: [SurrealDbService],
    };
  }
}