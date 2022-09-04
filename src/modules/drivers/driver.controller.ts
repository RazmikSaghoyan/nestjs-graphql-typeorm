import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { DriverInput } from './driver.model';
import { DriverService } from './driver.service';

@Controller('drivers')
export class DriverController {

  constructor(
    private readonly driverService: DriverService,
  ) {
  }

  @Get()
  async getAllDrivers() {
    const drivers = await this.driverService.findAll();

    return { drivers };
  }

  @Get(':id')
  async getDriversById(@Param('id') id: number) {
    const driver = await this.driverService.findById(id);

    if (!driver) {
      throw new NotFoundException('Drivers not found');
    }

    return { driver };
  }

  @Post()
  async createDrivers(@Body() data: DriverInput) {
    const driver = await this.driverService.createDriver(data);
    return { driver };
  }
}
