import { SurrealDbModule } from '@koakh/nestjs-surrealdb';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // SurrealDbModule.register({
    //   url: 'http://127.0.0.1:8000/rpc',
    //   namespace: 'test',
    //   database: 'test',
    //   user: 'root',
    //   pass: 'root',
    // })
    SurrealDbModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('SURREALDB_URL'),
        namespace:  configService.get('SURREALDB_NAMESPACE'),
        database:  configService.get('SURREALDB_DATABASE'),
        user:  configService.get('SURREALDB_USER'),
        pass:  configService.get('SURREALDB_PASS'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
