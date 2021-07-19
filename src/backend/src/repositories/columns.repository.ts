import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Columns, ColumnsRelations, Tasks} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TasksRepository} from './tasks.repository';

export class ColumnsRepository extends DefaultCrudRepository<Columns, typeof Columns.prototype.id, ColumnsRelations> {
  public readonly tasks: HasManyRepositoryFactory<Tasks, typeof Columns.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
    @repository.getter('TasksRepository') protected tasksRepositoryGetter: Getter<TasksRepository>,
  ) {
    super(Columns, dataSource);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', tasksRepositoryGetter);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
  }
}
