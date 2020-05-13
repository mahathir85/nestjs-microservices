import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  //#API orderService - create order
  @Post('order/create')
  createOrder(
    @Body('name') orderName: string,
    @Body('phone') orderPhone: string,
    @Body('price') orderPrice: number
  ){
    return this.appService.createOrder(orderName, orderPhone, orderPrice);
  }
  
  //#API orderService - get specific order details
  @Get('order/find/:id')
  findOrder(
    @Param('id') paramOrderId: number
  ){
    return this.appService.findOrder(paramOrderId);
  }

  //#API orderService - get all orders
  @Get('order/all')
  allOrder(){
    return this.appService.allOrder();
  }

  //#API orderService - cancel order
  @Post('order/cancel')
  cancelOrder(
    @Body('id') orderId: number
  ){
    return this.appService.cancelOrder(orderId);
  }

  //#API orderService - confirm order, pay order & update status delivery
  @Post('order/pay')
  payOrder( 
    @Body('id') orderId: number
  ){
    return this.appService.payOrder(orderId);
  }

  //#API orderService - get all orders
  @Get('pay/all')
  allPayment(){
    return this.appService.allPayment();
  }
}
