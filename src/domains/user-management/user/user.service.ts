import {Injectable} from '@nestjs/common';
import {User} from './entities/User';
import {UserRepository} from './repositories/user.repository';
import {Result} from '../../../models/Result';
import {CreateUserRequest} from './requests/CreateUserRequest';
import {GetUsersRequest} from "./requests/GetUsersRequest";
import {UsersDetailsResponse} from "./responses/UsersDetailsResponse";
import CommonException from "../../../models/CommonException";
import ErrorCodes from "../../../utils/ErrorCodes";


@Injectable()
export class UserService {


    constructor(private readonly userRepository: UserRepository ) {}

    async getUsers(request: GetUsersRequest):  Promise<Result> {
        const usersListResponse = await this.userRepository.find({
            where: {
                isActive: request.isActive
            }
        });
        return Result.success(usersListResponse)
    }


    async registerNewUser(request: CreateUserRequest): Promise<Result> {
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
            , relations:[  "" ]
        });

        if(!user) throw new CommonException(ErrorCodes.USER_NOT_FOUND);

        const userDetailsResponse = new UsersDetailsResponse(user);

        return Result.success(userDetailsResponse)
    }



}
