
import { User } from '../entities/User';
import { EntityRepository, Repository } from 'typeorm/index';


@EntityRepository(User)
export class UserRepository extends Repository<User> {}