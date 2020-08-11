import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './requests/CreateUserRequest';
import CommonException from '../../models/CommonException';
import ErrorCodes from '../../utils/ErrorCodes';
import { User } from './entities/User';
import { SuccessResponse } from '../../models/SuccessResponse';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {

  constructor(private userService: UserService , private configService: ConfigService) {}

  @Post('getAll')
  async getAllUsers(): Promise<User[]> {
    console.log(process.env.NODE_ENV);
    return await this.userService.findAll();
  }

  @Post('getException')
  async getException(): Promise<User[]> {
    throw new CommonException("Some Exception Occurred" , ErrorCodes.INVALID_USER_INFO);
  }

  @Post('createNew')
  @ApiBody( { required:true , type : CreateUserRequest })
  async createNewUser(@Body() request: CreateUserRequest , @Res() response)   {

    const result = await this.userService.addOne(request);
    response.json(new SuccessResponse(result.getValue()));
  }

}
