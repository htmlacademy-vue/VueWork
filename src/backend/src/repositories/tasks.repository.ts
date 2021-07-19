import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Tasks, TasksRelations, Columns, Comments, Ticks, Statuses, User} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ColumnsRepository} from './columns.repository';
import {CommentsRepository} from './comments.repository';
import {TicksRepository} from './ticks.repository';
import {StatusesRepository} from './statuses.repository';
import {UserRepository} from './user.repository';

export class TasksRepository extends DefaultCrudRepository<Tasks, typeof Tasks.prototype.id, TasksRelations> {
  public readonly column: BelongsToAccessor<Columns, typeof Tasks.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<Comments, typeof Tasks.prototype.id>;

  public readonly ticks: HasManyRepositoryFactory<Ticks, typeof Tasks.prototype.id>;

  public readonly status: BelongsToAccessor<Statuses, typeof Tasks.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Tasks.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
    @repository.getter('ColumnsRepository') protected columnsRepositoryGetter: Getter<ColumnsRepository>,
    @repository.getter('CommentsRepository') protected commentsRepositoryGetter: Getter<CommentsRepository>,
    @repository.getter('TicksRepository') protected ticksRepositoryGetter: Getter<TicksRepository>,
    @repository.getter('StatusesRepository') protected statusesRepositoryGetter: Getter<StatusesRepository>,
    @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Tasks, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.status = this.createBelongsToAccessorFor('status', statusesRepositoryGetter);
    this.registerInclusionResolver('status', this.status.inclusionResolver);
    this.ticks = this.createHasManyRepositoryFactoryFor('ticks', ticksRepositoryGetter);
    this.registerInclusionResolver('ticks', this.ticks.inclusionResolver);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', commentsRepositoryGetter);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.column = this.createBelongsToAccessorFor('column', columnsRepositoryGetter);

    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.updatedAt = new Date();
    });
  }
}
