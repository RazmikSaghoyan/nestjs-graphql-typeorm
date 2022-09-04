import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CarService } from '../cars/car.service';

import { Driver, DriverInput } from './driver.model';

@Injectable()
export class DriverService {

  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    @Inject(forwardRef(() => CarService))
    private readonly teamService: CarService,
  ) {}

  findAll() {
    return this.driverRepository.find({
      relations: [ 'cars' ],
    });
  }

  findById(id: number) {
    return this.driverRepository.findOne({ id }, {
      relations: [ 'cars' ],
    });
  }

  async createDriver( data: DriverInput ) {
    const driver = await this.driverRepository.save(
      this.driverRepository.create(data)
    );
    if(data.carId) {
      await this.teamService.addDriver(data.carId, driver.id);
    }
    return driver;
  }

  findByIds(ids: number[]) {
    return this.driverRepository.find({
      where: { id: In(ids) },
      relations: [ 'cars' ],
    });
  }

}
