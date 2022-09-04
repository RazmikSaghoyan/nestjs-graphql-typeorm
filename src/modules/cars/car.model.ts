import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Driver } from '../drivers/driver.model';

@Entity('cars')
@ObjectType()
export class Car {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  name: string;

  @ManyToMany(() => Driver, driver => driver.cars)
  @JoinTable()
  @Field(type => [ Driver ], { nullable: true })
  drivers: Promise<Driver[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@InputType()
export class CarInput {
  @Field({ nullable: false })
  name: string;
}