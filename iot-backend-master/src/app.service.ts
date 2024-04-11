import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIoT(): string {
    return 'IoT service!';
  }
}
