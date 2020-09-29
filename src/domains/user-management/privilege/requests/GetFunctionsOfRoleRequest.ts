import {  IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseRequest } from '../../../../models/BaseRequest';

export class GetFunctionsOfRoleRequest extends BaseRequest{

  @ApiModelProperty()
  @IsNotEmpty()
  roleCode: number;


}