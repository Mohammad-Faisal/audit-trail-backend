import {Injectable} from '@nestjs/common';
import {User} from './entities/User';
import {UserRepository} from './repositories/user.repository';
import {Result} from '../../models/Result';
import {CreateUserRequest} from './requests/CreateUserRequest';
import {GetUsersRequest} from "./requests/GetUsersRequest";


@Injectable()
export class UserService {


    constructor(private readonly userRepository: UserRepository) {
    }

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
        user.firstName = request.firstName;
        user.lastName = request.lastName;

        //const saveUserResponse =  this.usersRepository.saveUser(user);
        const saveUserResponse = await this.userRepository.save(user);
        return Result.success(saveUserResponse)
    }


}
