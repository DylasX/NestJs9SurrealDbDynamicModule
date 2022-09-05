import { SurrealDbModule, SurrealDbService, SURREALDB_CONFIG_OPTIONS } from '@koakh/nestjs-surrealdb';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TODO: use ConfigService
    // SurrealDbModule.register({
    //   // url: 'http://surrealdb:8000/rpc',
    //   url: 'http://127.0.0.1:8000/rpc',
    //   namespace: 'test',
    //   database: 'test',
    //   user: 'root',
    //   pass: 'root',
    //   configPath: `${process.cwd()}/config`
    // })
    SurrealDbModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('SURREALDB_URL'),
        namespace:  configService.get('SURREALDB_NAMESPACE'),
        database:  configService.get('SURREALDB_DATABASE'),
        user:  configService.get('SURREALDB_USER'),
        pass:  configService.get('SURREALDB_PASS'),
        configPath: `${process.cwd()}/config`      
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
