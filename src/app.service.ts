import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  greatMe(): string {
    return 'How are you Patrick'
  }
}
