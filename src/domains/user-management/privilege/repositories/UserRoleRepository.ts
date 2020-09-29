import { EntityRepository, Repository } from 'typeorm/index';
import { UserRole} from "../entities/UserRole";

@EntityRepository(UserRole)
export class UserRoleRepository extends Repository<UserRole> {

}