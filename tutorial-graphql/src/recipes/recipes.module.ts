import { SurrealDbModule, SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  imports: [SurrealDbModule],
  providers: [RecipesResolver, RecipesService, DateScalar, SurrealDbService],
  // exports: [SurrealDbService],
})
export class RecipesModule { }
