import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { Car } from './car.model';
import { CarResolver } from './car.resolver';
import { DriverModule } from '../drivers/driver.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Car ]),
    forwardRef(() => DriverModule),
  ],
  providers: [ CarService, CarResolver ],
  exports: [ CarService ],
  controllers: [ CarController ],
})
export class CarModule {
}
