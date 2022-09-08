import { SurrealDbModule, SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  // imports: [SurrealDbModule],
  // TODO: fuck trick is using provider SurrealDbModule ?????? WTF
  providers: [RecipesResolver, RecipesService, DateScalar, SurrealDbModule],
  // exports: [SurrealDbService],
})
export class RecipesModule { }
