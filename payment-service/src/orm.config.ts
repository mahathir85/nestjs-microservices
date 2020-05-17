import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
    type: 'mysql',
    port: 3306,
    username: "root",
    password: "password",
    database: "paymentapp",
    host: '172.17.0.6',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
    retryAttempts: 100,
    retryDelay: 5000
}