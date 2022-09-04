import { Int, Args, Parent, Query, Mutation, Resolver, ResolveField } from '@nestjs/graphql';
import { Driver, DriverInput } from './driver.model';
import { DriverService } from './driver.service';
import { CarService } from '../cars/car.service';
import { forwardRef, Inject } from '@nestjs/common';
import { Car } from '../cars/car.model';

@Resolver(of => Driver)
export class DriverResolver {
  constructor(
    private readonly driverService: DriverService,
    @Inject(forwardRef(() => CarService))
    private readonly teamService: CarService,
  ) { }

  @Query(returns => [Driver], { name: 'drivers', nullable: false })
  async getDrivers() {
    return this.driverService.findAll();
  }

  @Query(returns => Driver, { name: 'driver', nullable: true })
  async getDriversById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.driverService.findById(id);
  }

  @Mutation(() => Driver, { name: 'createDriver'})
  async createDriver(@Args('data') input: DriverInput): Promise<Driver> {
    return this.driverService.createDriver(input);
  }

  @ResolveField('cars', () => [Car], {nullable: false})
  async getCars(@Parent() driver: Driver) {
    return await driver.cars;
  }
}
