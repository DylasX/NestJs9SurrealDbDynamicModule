import { ConfigurableModuleBuilder } from '@nestjs/common';
import { SurrealDbOptions } from './interfaces';

type SurrealDbModuleOptions = SurrealDbOptions;

export const {
  ConfigurableModuleClass: ConfigurableSurrealDbModule,
  MODULE_OPTIONS_TOKEN: SURREALDB_CONFIG_OPTIONS,
} = new ConfigurableModuleBuilder<SurrealDbModuleOptions>().build();