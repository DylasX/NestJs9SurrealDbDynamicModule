# README

## Links

- [Documentation | NestJS - A progressive Node.js framework](https://docs.nestjs.com/graphql/quick-start)
- [nest/sample/23-graphql-code-first at master · nestjs/nest](https://github.com/nestjs/nest/tree/master/sample/23-graphql-code-first)

## Prerequisites

Please make sure that Node.js (version >= 12, except for v13) is installed on your operating system.

## Setup

Setting up a new project is quite simple with the Nest CLI. With npm installed, you can create a new Nest project with the following commands in your OS terminal:


```shell
$ npm i -g @nestjs/cli
```

## Create a new NestJs Project

```shell
$ nest new tutorial-graphql
? Which package manager would you ❤️  to use? 
  npm 
❯ yarn 
  pnpm
```

## Installing the required packages:

```shell
# For Express and Apollo (default)
$ yarn add @nestjs/graphql @nestjs/apollo @nestjs/config graphql apollo-server-express
```

replace `src/app.module.ts` with

```ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
  driver: ApolloDriver,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    typePaths: configService.get<string>('GRAPHQL_TYPE_PATHS'),
  }),
  inject: [ConfigService],
}),
  ],
})

export class AppModule {}
```

## Code first


