import { Body, Controller , Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './requests/CreateUserRequest';
import { SuccessResponse } from '../../../models/SuccessResponse';
import {ApiBody, ApiHeader, ApiTags} from '@nestjs/swagger';
import {GetUsersRequest} from "./requests/GetUsersRequest";

@ApiTags("User")
@ApiHeader({ name:"authtoken" })
@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @Post('getUsers')
  async getAllUsers(@Body() request : GetUsersRequest , @Res() response) {
    const result = await this.userService.getUsers(request);
    response.json(new SuccessResponse(result.getValue()));
  }


  @Post('registerNewUser')
  @ApiBody( { required:true , type : CreateUserRequest })
  async registerNewUser(@Body() request: CreateUserRequest , @Res() response)   {
    const result = await this.userService.registerNewUser(request);
    response.json(new SuccessResponse(result.getValue()));
  }

}
