import { Args, Int, Mutation, Parent, Query, ResolveField, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Car, CarInput } from './car.model';
import { CarService } from './car.service';
import { DriverService } from '../drivers/driver.service';
import { forwardRef, Inject } from '@nestjs/common';
import { Driver } from '../drivers/driver.model';

@Resolver(of => Car)
export class CarResolver {
  constructor(
    @Inject(forwardRef(() => DriverService))
    private readonly driverService: DriverService,
    private readonly carService: CarService,
  ) {
  }

  @Query(returns => [Car], {name: 'cars', nullable: true})
  async getCars() {
    return this.carService.findAll();
  }

  @Query(returns => Car, { name: 'car', nullable: true })
  async getCarById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.carService.findById(id);
  }

  @Mutation(() => Car, { name: 'createCar'})
  async createCar(@Args('data') input: CarInput): Promise<Car> {
    return this.carService.createCar(input);
  }

  @Mutation(returns => Car, { nullable: true })
  async addDriver(
    @Args({ name: 'carId', type: () => Int }) carId: number,
    @Args({ name: 'driverId', type: () => Int }) driverId: number,
  ) {
    return this.carService.addDriver(carId, driverId);
  }

  @Mutation(returns => Car, { nullable: true })
  async removeDriver(
    @Args({ name: 'carId', type: () => Int }) carId: number,
    @Args({ name: 'driverId', type: () => Int }) driverId: number,
  ) {
    return this.carService.removeDriver(carId, driverId);
  }

  @ResolveField('drivers', returns => [ Driver ], { nullable: true })
  async getDrivers(@Parent() car: Car) {
    return await car.drivers;
  }
}
