import { ConfigModule } from '@koakh/nestjs9-dynamic-module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.register({ folder: `${process.cwd()}/config` })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
