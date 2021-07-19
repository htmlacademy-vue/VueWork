import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {User, CustomUserRelations, UserCredentials, Tasks, Comments} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserCredentialsRepository} from './user-credentials.repository';
import {TasksRepository} from './tasks.repository';
import {CommentsRepository} from './comments.repository';

export class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id, CustomUserRelations> {
  public readonly customUserCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;

  public readonly tasks: HasManyRepositoryFactory<Tasks, typeof User.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<Comments, typeof User.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
    @repository.getter('TasksRepository') protected tasksRepositoryGetter: Getter<TasksRepository>,
    @repository.getter('CommentsRepository') protected commentsRepositoryGetter: Getter<CommentsRepository>,
  ) {
    super(User, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', commentsRepositoryGetter);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', tasksRepositoryGetter);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
    this.customUserCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );
    this.registerInclusionResolver('userCredentials', this.customUserCredentials.inclusionResolver);
  }

  async findCredentials(userId: typeof User.prototype.id): Promise<UserCredentials | undefined> {
    try {
      return await this.customUserCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
