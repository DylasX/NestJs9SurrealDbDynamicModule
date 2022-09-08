import { SurrealDbModule, SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DateScalar } from '../common/scalars/date.scalar';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  imports: [
    SurrealDbModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('SURREALDB_URL'),
        namespace: configService.get('SURREALDB_NAMESPACE'),
        database: configService.get('SURREALDB_DATABASE'),
        user: configService.get('SURREALDB_USER'),
        pass: configService.get('SURREALDB_PASS'),
      }),
    }),
  ],
  providers: [RecipesResolver, RecipesService, DateScalar],
})
export class RecipesModule { }
