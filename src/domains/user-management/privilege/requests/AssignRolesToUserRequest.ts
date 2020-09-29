import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {IsArray, IsNotEmpty} from "class-validator";

export class AssignRolesToUserRequest {

    @ApiModelProperty()
    @IsNotEmpty()
    userId: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsArray()
    roleCodes: string[];

}