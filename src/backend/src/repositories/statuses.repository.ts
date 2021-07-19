import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Statuses, StatusesRelations, Tasks} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TasksRepository} from './tasks.repository';

export class StatusesRepository extends DefaultCrudRepository<
  Statuses,
  typeof Statuses.prototype.id,
  StatusesRelations
> {
  public readonly tasks: HasManyRepositoryFactory<Tasks, typeof Statuses.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
    @repository.getter('TasksRepository') protected tasksRepositoryGetter: Getter<TasksRepository>,
  ) {
    super(Statuses, dataSource);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', tasksRepositoryGetter);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
  }
}
