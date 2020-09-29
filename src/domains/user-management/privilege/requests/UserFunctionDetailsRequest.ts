import {  IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseRequest } from '../../../../models/BaseRequest';

export class UserFunctionDetailsRequest extends BaseRequest{

  @ApiModelProperty()
  @IsNotEmpty()
  functionId: number;


}