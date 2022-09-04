import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.model';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { DriverResolver } from './driver.resolver';
import { CarModule } from '../cars/car.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Driver ]),
    forwardRef(() => CarModule),
  ],
  providers: [ DriverService, DriverResolver ],
  exports: [ DriverService ],
  controllers: [ DriverController ],
})
export class DriverModule {
}
