import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Order} from './order.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

import {config} from './orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Order]),
    ClientsModule.register([     
      {
        name: 'SERVICE_PAYMENT',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3002,
        },
      },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
