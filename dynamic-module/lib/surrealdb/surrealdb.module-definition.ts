import { ConfigurableModuleBuilder } from '@nestjs/common';
import { SurrealDbOptions } from './interfaces';

export const {
  ConfigurableModuleClass: ConfigurableSurrealDbModule,
  MODULE_OPTIONS_TOKEN: SURREALDB_CONFIG_OPTIONS,
} = new ConfigurableModuleBuilder<SurrealDbOptions>()
  .setClassMethodName('forRoot')
  .build();