import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class SignInRequest {

  @ApiModelProperty()
  @IsNotEmpty()
  email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password: string;

}