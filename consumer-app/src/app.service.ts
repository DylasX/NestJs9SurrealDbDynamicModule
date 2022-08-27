import { ConfigService } from '@koakh/nestjs9-dynamic-module';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private helloMessage: string;

  constructor(configService: ConfigService) {
    this.helloMessage = configService.get('HELLO_MESSAGE');
  }

  getHello(): string {
    return this.helloMessage;
  }
}
