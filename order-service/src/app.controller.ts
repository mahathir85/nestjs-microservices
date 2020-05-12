import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create' })
  create(data: any) {    
    return this.appService.createOrder(data);
  }

  @MessagePattern({ cmd: 'find' })
  find(paramId: string){    
    return this.appService.find(paramId);
  }

  @MessagePattern({ cmd: 'all' })
  all(){
    return this.appService.all();
  }

  @MessagePattern({ cmd: 'cancel' })
  cancel(paramId: number){
    return this.appService.cancel(paramId);
  }
 
  @MessagePattern({ cmd: 'pay' })
  pay(paramId: number){
    return this.appService.pay(paramId);
  }
 
}
