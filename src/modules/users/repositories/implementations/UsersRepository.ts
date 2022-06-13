import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    const id = user_id;
    return await this.repository.findOne({id},{ relations: ["games"] });
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("select * from users order by first_name asc"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[]> {
    return this.repository.query(`select * from users where LOWER(first_name) like LOWER('%${first_name}%') and LOWER(last_name) like LOWER('%${last_name}%')`);
  }
}
