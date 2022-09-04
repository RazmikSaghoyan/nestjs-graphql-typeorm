import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CarInput } from './car.model';
import { CarService } from './car.service';

@Controller('cars')
export class CarController {

  constructor(
    private readonly carService: CarService,
  ) {
  }

  @Get()
  async getAllCars() {
    const cars = await this.carService.findAll();

    return { cars };
  }

  @Get(':id')
  async getCarById(@Param('id') id: number) {
    const car = await this.carService.findById(id);

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    return { car };
  }

  @Post()
  async createCar(@Body() data: CarInput) {
    const car = await this.carService.createCar(data);
    return { car };
  }
}
