import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './requests/CreateUserRequest';
import CommonException from '../../models/CommonException';
import ErrorCodes from '../../utils/ErrorCodes';
import { User } from './entities/User';
import { SuccessResponse } from '../../models/SuccessResponse';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @Post('getAll')
  async getAllUsers(): Promise<User[]> {
    console.log(process.env.PORT)
    return await this.userService.findAll();
  }

  @Post('getException')
  async getException(): Promise<User[]> {
    throw new CommonException("Some Exception Occurred" , ErrorCodes.INVALID_USER_INFO);
  }

  @Post('createNew')
  async createNewUser(@Body() request: CreateUserRequest , @Res() response)   {

    const result = await this.userService.addOne(request);
    response.json(new SuccessResponse(result.getValue()));
  }

}
