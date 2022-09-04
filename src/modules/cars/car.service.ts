import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Car, CarInput } from './car.model';
import { DriverService } from '../drivers/driver.service';

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @Inject(forwardRef(() => DriverService))
    private readonly driverService: DriverService,
  ) {
  }

  findAll() {
    return this.carRepository.find({
      relations: [ 'drivers' ],
    });
  }

  findById(id: number) {
    return this.carRepository.findOne({ id }, {
      relations: [ 'drivers' ],
    });
  }

  findByIds(ids: number[]) {
    return this.carRepository.find({
      where: { id: In(ids) },
      relations: [ 'drivers' ],
    });
  }

  createCar(data: CarInput) {
    const team = this.carRepository.create(data);

    return this.carRepository.save(team);
  }

  async addDriver(carId: number, driverId: number) {
    const car = await this.findById(carId);

    if (!car) return null;

    const driver = await this.driverService.findById(driverId);
    if (driver) {
      (await car.drivers).push(driver);

      await this.carRepository.save(car);
    }

    return car;
  }

  async removeDriver(carId: number, driverId: number) {
    const car = await this.findById(carId);
    const drivers = await car.drivers;

    const index = drivers.findIndex(item => item.id === driverId);

    if (index >= 0) {
      drivers.splice(index, 1);
      await this.carRepository.save(car);
    }

    return car;
  }
}
