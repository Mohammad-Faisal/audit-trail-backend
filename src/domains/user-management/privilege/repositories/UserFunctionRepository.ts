import { EntityRepository, Repository } from 'typeorm/index';
import {UserFunction} from "../entities/UserFunction";

@EntityRepository(UserFunction)
export class UserFunctionRepository extends Repository<UserFunction> {

}