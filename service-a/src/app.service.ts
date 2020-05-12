import { Injectable, Inject, Logger } from '@nestjs/common';
import { RpcException,ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { map } from 'rxjs/operators';

import { Order } from './order.entity';

const logger = new Logger();

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    
    @Inject('SERVICE_PAYMENT') private readonly clientPaymentApp: ClientProxy,
  ) {}

  //return this.appService.createOrder(prodName, prodPhone, prodPrice);
  async createOrder(paramData: any){     
    const order = this.orderRepository.create();    
    order.name = paramData.name;
    order.phone = paramData.phone;
    order.price = paramData.price;
    await this.orderRepository.save(order);

    logger.log('New order created. The orderId: ' + order.id);

    return order;        
  }

  //To get order details by order id
  async find(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne(id);

    if (!order) {
      throw new RpcException('Order not found.');
    }
    logger.log('Return order details for orderId: ' + id);

    return order;
  }

  //To get all order list  
  async all(): Promise<Order[]> {
    logger.log('Return all order');

    return await this.orderRepository.find();
  }

  //To do cancel order by id
  async cancel(id: number): Promise<UpdateResult> {   
    const order = await this.orderRepository.findOne(id);

    if (!order) {
      throw new RpcException('Order not found.');
    }
     
    return this.orderRepository.update(
        { id },
        { status: "CANCELED", updateTimestamp: new Date() },
    );
  }
  
  //To do order confirmation
  async confirm(id: number, paymentData: any): Promise<UpdateResult> {            
    return this.orderRepository.update(
        { id },
        { status: paymentData.status === 'DECLINED' ? 'CANCELED' : "CONFIRMED", updateTimestamp: new Date(), paymentId: paymentData.id },
    );
  }

  //To do checking order before proceed payment
  async pay(id: number){
    const order = await this.orderRepository.findOne(id);
    const self = this;

    if (!order) {
      throw new RpcException('Order not found.');
    }

    logger.log('Prepare for payment for orderId: ' + order.id);
    //To do payment request preparation
    const pattern = { cmd: 'pay' };
    const payload = { id: id, orderData: order};
    
    return this.clientPaymentApp
    .send<string>(pattern, payload)
      .pipe(
        map(( message: any) => {
          //To do update order confirmation
          this.confirm(id,message); 

          switch(message.status){
            //Order canceled
            case 'DECLINED':
              logger.log("Status order confirmation: CANCELED");
            break;
            //To do order delivery
            default:
              logger.log("Status order confirmation: CONFIRMED");
              logger.log('Please wait 5 sec to deliver order.....');
              setTimeout(() => {            
                this.orderRepository.update(
                    { id },
                    { status: 'DELIVERED', updateTimestamp: new Date() },
                );

                logger.log('Order status: DELIVERED !!!');
    
              }, 5000);
            break;
          } 
          
          return message;
        })        
      );
  }
}
