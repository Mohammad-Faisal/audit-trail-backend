import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User';
import { EntityRepository, Repository } from 'typeorm/index';


@EntityRepository(User)
export class UserRepository extends Repository<User> {}