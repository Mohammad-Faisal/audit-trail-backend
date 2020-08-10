import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getCustomRepository, Repository } from 'typeorm/index';
import { User } from './entities/User';
import { UserRepository } from './user.repository';
import { Result } from '../../models/Result';
import { CreateUserRequest } from './requests/CreateUserRequest';


@Injectable()
export class UserService {

  //constructor(private usersRepository: UserRepository) {}


  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
    //return await this.usersRepository.findAllUsers();
  }

  async addOne(request : CreateUserRequest): Promise<Result> {
    const user  = new User();
    user.firstName = request.firstName;
    user.lastName = request.lastName;

    //const saveUserResponse =  this.usersRepository.saveUser(user);
    const saveUserResponse =  await this.userRepository.save(user);
    return Result.success(saveUserResponse)
  }


}
