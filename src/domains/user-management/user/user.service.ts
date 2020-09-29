import {Injectable} from '@nestjs/common';
import {User} from './entities/User';
import {UserRepository} from './repositories/user.repository';
import {Result} from '../../../models/Result';
import {CreateUserRequest} from './requests/CreateUserRequest';
import {GetUsersRequest} from "./requests/GetUsersRequest";
import {UserRoleRepository} from "../privilege/repositories/UserRoleRepository";
import {UsersDetailsResponse} from "./responses/UsersDetailsResponse";


@Injectable()
export class UserService {


    constructor(
        private readonly userRepository: UserRepository ,
        private readonly userRoleRepository: UserRoleRepository
    ) {}

    async getUsers(request: GetUsersRequest):  Promise<Result> {
        const usersListResponse = await this.userRepository.find({
            where: {
                isActive: request.isActive
            }
        });
        return Result.success(usersListResponse)
    }


    async addOne(request: CreateUserRequest): Promise<Result> {
        const user = new User();
        user.name = request.name;
        user.phone = request.phone;

        //const saveUserResponse =  this.usersRepository.saveUser(user);
        const saveUserResponse = await this.userRepository.save(user);
        return Result.success(saveUserResponse)
    }


    async getUserDetails(request : any):  Promise<Result> {

        const user : User=  await this.userRepository.findOne({
            where: {
                firebaseId:request.requesterFirebaseId
            }
            , relations:[  "userRoles" ]
        });

        let userFunctions =[]
        if(user){
            for (const role of user.userRoles) {
                const functionsForRole = await this.userRoleRepository.findOne({where : {code : role.code} ,
                    relations:["userFunctions"]});
                userFunctions = [ ...userFunctions , ...functionsForRole.userFunctions ]
            }
            user["userFunctions"] = userFunctions;
        }
        const userDetailsResponse = new UsersDetailsResponse(user);

        return Result.success(userDetailsResponse)
    }



}
