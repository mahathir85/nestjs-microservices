import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern({ cmd: 'pay' })
  pay(data: any){
    return this.appService.pay(data);
  }

  @MessagePattern({ cmd: 'all' })
  all(data: any){
    return this.appService.all();
  }
}
