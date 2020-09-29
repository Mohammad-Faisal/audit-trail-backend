import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {BaseEntity} from "../../../models/BaseEntity";


@Entity({ name : "USER"})
export class User extends BaseEntity{

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}