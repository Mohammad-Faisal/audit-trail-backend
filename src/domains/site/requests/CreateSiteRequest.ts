import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseRequest } from '../../../models/BaseRequest';

export class CreateSiteRequest extends BaseRequest{

  @ApiModelProperty()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty()
  description: string;

  @ApiModelProperty()
  region: string;


  @ApiModelProperty()
  lat: number;


  @ApiModelProperty()
  lng: number;


}