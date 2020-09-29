import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {IsArray, IsNotEmpty} from "class-validator";

export class AssignFunctionsToRoleRequest {

    @ApiModelProperty()
    @IsNotEmpty()
    roleCode: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsArray()
    functionCodes: string[];

}