import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from './payment.entity';

const logger = new Logger();

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}
  
  //To do payment
  async pay(paramData: any){
   logger.log('Payment for orderId: ' + paramData.orderData.id);

   const payment = this.paymentRepository.create();
   payment.orderId = paramData.orderData.id;
   payment.price = paramData.orderData.price;
   payment.status = Math.random() >= 0.5 ? 'CONFIRMED' : 'DECLINED';
   await this.paymentRepository.save(payment);
   logger.log('Payment status: ' + payment.status);   

   return payment;
  }

  //To get all order list  
  async all(): Promise<Payment[]> {
    logger.log('Return all order');

    return await this.paymentRepository.find();
  }
}
