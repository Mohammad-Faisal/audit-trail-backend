import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class SignUpRequest {

  @ApiModelProperty()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  password: string;

}