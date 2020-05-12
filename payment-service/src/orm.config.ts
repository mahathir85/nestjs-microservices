import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    port: 5432,
    username: "postgres",
    password: "123",
    database: "orderapp",
    host: '127.0.0.1',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
}