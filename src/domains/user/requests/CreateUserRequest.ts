import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserRequest {

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;


}