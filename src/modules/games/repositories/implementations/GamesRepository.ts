import { title } from 'process';
import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private repositoryUser: Repository<User>;

  constructor() {
    this.repository = getRepository(Game);
    this.repositoryUser = getRepository(User);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository.createQueryBuilder("games")
    .where("LOWER(games.title) like LOWER(:title)", { title: `%${param}%` }).getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("select COUNT(id) from games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
   return await this.repositoryUser.createQueryBuilder("user").where("user.id = :id", { id }).getMany();
  }
}
