import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverModule } from './modules/drivers/driver.module';
import { CarModule } from './modules/cars/car.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Car } from './modules/cars/car.model';
import { Driver } from './modules/drivers/driver.model';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      database: process.env.DB_NAME || '',
      username: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
      entities: [ Car, Driver ],
      synchronize: !!process.env.DB_SYNCHRONIZE || false,
    }),
    GraphQLModule.forRoot({ autoSchemaFile: true }),

    DriverModule,
    CarModule,
  ],
})
export class AppModule {
}
