import {Body, Controller, Post, Res} from '@nestjs/common';
import {SuccessResponse} from "../../../models/SuccessResponse";
import {PrivilegeService} from "./privilege.service";
import {CreateUserRoleRequest} from "./requests/CreateUserRoleRequest";
import {CreateUserFunctionRequest} from "./requests/CreateUserFunctionRequest";
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import {AssignFunctionsToRoleRequest} from "./requests/AssignFunctionsToRoleRequest";
import { GetFunctionsOfRoleRequest } from './requests/GetFunctionsOfRoleRequest';
import { UserRoleDetailsRequest } from './requests/UserRoleDetailsRequest';
import { UserFunctionDetailsRequest } from './requests/UserFunctionDetailsRequest';
import { AssignRolesToUserRequest } from './requests/AssignRolesToUserRequest';

@ApiTags("Privilege")
@ApiHeader({ name:"authtoken" })
@Controller('privilege')
export class PrivilegeController {

    constructor(private privilegeService: PrivilegeService ) {}

    @Post('createNewRole')
    async createNewUserGroup(@Body() request: CreateUserRoleRequest , @Res() response)   {
        const result = await this.privilegeService.createNewUserRole(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('deleteRole')
    async deleteRole(@Body() request: UserRoleDetailsRequest , @Res() response)   {
        const result = await this.privilegeService.deleteRole(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('deleteFunction')
    async deleteFunction(@Body() request: UserFunctionDetailsRequest , @Res() response)   {
        const result = await this.privilegeService.deleteFunction(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('createNewFunction')
    async createNewUserFunction(@Body() request: CreateUserFunctionRequest , @Res() response)   {
        const result = await this.privilegeService.createNewUserFunction(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('getAllUserRoles')
    async getAllUserGroups(@Res() response) {
        const result = await this.privilegeService.getAllUserRoles();
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('getAllUserFunctions')
    async getAllUserFunctions(@Res() response) {
        const result = await this.privilegeService.getAllUserFunctions();
        response.json(new SuccessResponse(result.getValue()));
    }
    @Post('getUserFunctionsOfRole')
    async getUserFunctionsOfRole(@Body() request: GetFunctionsOfRoleRequest ,@Res() response) {
        const result = await this.privilegeService.getUserFunctionsOfRole(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('assignFunctionToRole')
    async assignFunctionToRole(@Body() request: AssignFunctionsToRoleRequest , @Res() response)   {
        const result = await this.privilegeService.assignFunctionsToRole(request);
        response.json(new SuccessResponse(result.getValue()));
    }

    @Post('assignRoleToUser')
    async assignRoleToUser(@Body() request: AssignRolesToUserRequest , @Res() response)   {
        const result = await this.privilegeService.assignRoleToUser(request);
        response.json(new SuccessResponse(result.getValue()));
    }

}
