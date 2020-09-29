import { Body, Controller , Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './requests/CreateUserRequest';
import CommonException from '../../models/CommonException';
import ErrorCodes from '../../utils/ErrorCodes';
import { User } from './entities/User';
import { SuccessResponse } from '../../models/SuccessResponse';
import { ApiBody } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import {GetUsersRequest} from "./requests/GetUsersRequest";

@Controller('user')
export class UserController {

  constructor(private userService: UserService , private configService: ConfigService) {}

  @Post('getUsers')
  async getAllUsers(@Body() request : GetUsersRequest , @Res() response) {
    const result = await this.userService.getUsers(request);
    response.json(new SuccessResponse(result.getValue()));
  }


  @Post('createNew')
  @ApiBody( { required:true , type : CreateUserRequest })
  async createNewUser(@Body() request: CreateUserRequest , @Res() response)   {
    const result = await this.userService.addOne(request);
    response.json(new SuccessResponse(result.getValue()));
  }

}
