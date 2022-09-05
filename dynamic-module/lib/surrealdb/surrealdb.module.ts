import { DynamicModule, Module } from '@nestjs/common';
import { SurrealDbService } from './surrealdb.service';
import { SURREALDB_CONFIG_OPTIONS as SURREALDB_CONFIG_OPTIONS } from './constants';
import { SurrealDbOptions } from './interfaces';
import { ConfigurableModuleClass } from '@nestjs/common/cache/cache.module-definition';
import { ConfigurableSurrealDbModule } from './surrealdb.module-definition';
import SurrealDbAsyncOptions from './surrealdb.options.type';

type SurrealDbModuleOptions = SurrealDbOptions;

// @Module({})
// export class SurrealDbModule extends ConfigurableModuleClass {
//   static register(options: SurrealDbModuleOptions): DynamicModule {
//     return {
//       module: SurrealDbModule,
//       providers: [
//         {
//           provide: SURREALDB_CONFIG_OPTIONS,
//           useValue: options,
//         },
//         SurrealDbService,
//       ],
//       exports: [SurrealDbService],
//     };
//   }
// }

// @Module({
//   providers: [SurrealDbService],
//   exports: [SurrealDbService],
// })

// export class SurrealDbModule extends ConfigurableSurrealDbModule {}



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