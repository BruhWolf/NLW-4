import { User } from '../database/models/User'
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

}