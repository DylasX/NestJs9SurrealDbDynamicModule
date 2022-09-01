import { SurrealDbModule } from '@koakh/nestjs-surrealdb-driver';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // TODO: use ConfigService
    SurrealDbModule.register({
      url: 'http://127.0.0.1:8000/rpc',
      namespace: 'test',
      database: 'test',
      user: 'root',
      pass: 'root',
      configPath: `${process.cwd()}/config`
    })
    // TODO::
    // SurrealDbModule.registerAsync({
    //   useFactory: () => {
    //     return {
    //     }
    //   },
    //   // any extra dependencies
    //   inject: []
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
