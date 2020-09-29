import { Injectable } from '@nestjs/common';
import {Result} from "../../../models/Result";
import {UserRoleRepository} from "./repositories/UserRoleRepository";
import {UserFunctionRepository} from "./repositories/UserFunctionRepository";
import {CreateUserFunctionRequest} from "./requests/CreateUserFunctionRequest";
import {UserFunction} from "./entities/UserFunction";
import {CreateUserRoleRequest} from "./requests/CreateUserRoleRequest";
import {UserRole} from "./entities/UserRole";
import CommonException from "../../../models/CommonException";
import ErrorCodes from "../../../utils/ErrorCodes";
import {AssignFunctionsToRoleRequest} from "./requests/AssignFunctionsToRoleRequest";
import { GetFunctionsOfRoleRequest } from './requests/GetFunctionsOfRoleRequest';
import { UserRoleDetailsRequest } from './requests/UserRoleDetailsRequest';
import { UserFunctionDetailsRequest } from './requests/UserFunctionDetailsRequest';
import { AssignRolesToUserRequest } from './requests/AssignRolesToUserRequest';
import {UserRepository} from "../user/repositories/user.repository";

@Injectable()
export class PrivilegeService {

    constructor(
        private readonly userRoleRepository: UserRoleRepository ,
        private readonly  userFunctionRepository : UserFunctionRepository,
        private readonly  userRepository : UserRepository,
    ) {}

    async getAllUserRoles():  Promise<Result> {
        const rolesList =  await this.userRoleRepository.find();
        return Result.success(rolesList)
    }

    async getAllUserFunctions():  Promise<Result> {
        const functionsList =  await this.userFunctionRepository.find();
        return Result.success(functionsList)
    }
    
    async getUserFunctionsOfRole(request : GetFunctionsOfRoleRequest):  Promise<Result> {
        const userRole =  await this.userRoleRepository.findOne(
          {where : { code : request.roleCode  } , relations : ["userFunctions"]}
        );
        if(!userRole ) throw new CommonException(ErrorCodes.USER_ROLE_NOT_FOUND);
        return Result.success(userRole.userFunctions);
    }

    async createNewUserFunction(request : CreateUserFunctionRequest): Promise<Result> {
        const userFunctionModel  = new UserFunction();


        await this.checkIfFunctionIsDuplicate(request);

        userFunctionModel.name = request.name;
        userFunctionModel.code = request.code;
        userFunctionModel.description = request.description;

        const userFunction =  await this.userFunctionRepository.save(userFunctionModel);
        return Result.success(userFunction)
    }

    async  checkIfFunctionIsDuplicate  ( request : CreateUserFunctionRequest)  {
        let testModel = await this.userFunctionRepository.findOne({where :{name : request.name}})
        if(testModel) throw new CommonException(ErrorCodes.USER_FUNCTION_NAME_DUPLICATE)
        testModel = await this.userFunctionRepository.findOne({where :{code : request.code}})
        if(testModel) throw new CommonException(ErrorCodes.USER_FUNCTION_CODE_DUPLICATE)
    }

    async createNewUserRole(request : CreateUserRoleRequest): Promise<Result> {

        await  this.checkIfRoleIsDuplicate(request);

        const userRoleModel  = new UserRole();
        userRoleModel.name = request.name;
        userRoleModel.code = request.code;
        userRoleModel.description = request.description;

        const userGroup =  await this.userRoleRepository.save(userRoleModel);
        return Result.success(userGroup)
    }

    async deleteRole(request : UserRoleDetailsRequest): Promise<Result> {
        const response =  await this.userRoleRepository.delete(request.roleId);
        return Result.success(response)
    }

    async deleteFunction(request : UserFunctionDetailsRequest): Promise<Result> {
        const response =  await this.userFunctionRepository.delete(request.functionId);
        return Result.success(response)
    }

    async  checkIfRoleIsDuplicate  ( request : CreateUserRoleRequest)  {
        let testModel = await this.userRoleRepository.findOne({where :{name : request.name}})
        if(testModel) throw new CommonException(ErrorCodes.USER_ROLE_NAME_DUPLICATE)
        testModel = await this.userRoleRepository.findOne({where :{code : request.code}})
        if(testModel) throw new CommonException(ErrorCodes.USER_ROLE_CODE_DUPLICATE)
    }

    async assignFunctionsToRole(request : AssignFunctionsToRoleRequest) : Promise<Result>  {

        const role = await this.userRoleRepository.findOne({where : {code : request.roleCode} })
        if(!role) throw new CommonException( ErrorCodes.USER_ROLE_NOT_FOUND)
        const userFunctionsArray = []
        for(const functionCode of request.functionCodes){
            const userFunction  = await this.userFunctionRepository.findOne({where: {code : functionCode}})
            if(!userFunction)throw new CommonException( ErrorCodes.USER_FUNCTION_NOT_FOUND);
            userFunctionsArray.push(userFunction)
        }

        role.userFunctions = userFunctionsArray;
        const response = await this.userRoleRepository.save(role);
        return Result.success(response)
    }
    async assignRoleToUser(request : AssignRolesToUserRequest) : Promise<Result>  {

        const user = await this.userRepository.findOne(request.userId)
        if(!user) throw new CommonException( ErrorCodes.USER_NOT_FOUND)
        const userRolesArray = []
        for(const roleCode of request.roleCodes){
            const userRole  = await this.userRoleRepository.findOne({where: {code : roleCode}})
            if(!userRole)throw new CommonException( ErrorCodes.USER_ROLE_NOT_FOUND);
            userRolesArray.push(userRole)
        }
        user.userRoles = userRolesArray;
        const response = await this.userRepository.save(user);
        return Result.success(response)
    }



}

