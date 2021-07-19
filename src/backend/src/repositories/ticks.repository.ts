import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Ticks, TicksRelations, Tasks} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TasksRepository} from './tasks.repository';

export class TicksRepository extends DefaultCrudRepository<Ticks, typeof Ticks.prototype.id, TicksRelations> {
  public readonly task: BelongsToAccessor<Tasks, typeof Ticks.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
    @repository.getter('TasksRepository') protected tasksRepositoryGetter: Getter<TasksRepository>,
  ) {
    super(Ticks, dataSource);
    this.task = this.createBelongsToAccessorFor('task', tasksRepositoryGetter);
  }
}
