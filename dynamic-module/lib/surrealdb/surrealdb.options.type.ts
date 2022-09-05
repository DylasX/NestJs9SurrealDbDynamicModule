import { ModuleMetadata } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { SurrealDbOptions } from './interfaces';
 
type SurrealDbAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<SurrealDbOptions>, 'useFactory' | 'inject'>;
 
export default SurrealDbAsyncOptions;