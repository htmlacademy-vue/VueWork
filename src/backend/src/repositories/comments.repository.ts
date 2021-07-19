import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Comments, CommentsRelations, Tasks, User} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TasksRepository} from './tasks.repository';
import {UserRepository} from './user.repository';

export class CommentsRepository extends DefaultCrudRepository<
  Comments,
  typeof Comments.prototype.id,
  CommentsRelations
> {
  public readonly task: BelongsToAccessor<Tasks, typeof Comments.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Comments.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
    @repository.getter('TasksRepository') protected tasksRepositoryGetter: Getter<TasksRepository>,
    @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Comments, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.task = this.createBelongsToAccessorFor('task', tasksRepositoryGetter);

    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.updatedAt = new Date();
    });
  }
}
