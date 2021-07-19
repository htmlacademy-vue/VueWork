import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  HttpErrors, oas, OperationVisibility,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest'
import {Tasks, Ticks} from '../models';
import {TasksRepository} from '../repositories';

@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class TasksTicksController {
  constructor(@repository(TasksRepository) protected tasksRepository: TasksRepository) {}

  @get('/tasks/{id}/ticks', {
    responses: {
      '200': {
        description: 'Array of Tasks has many Ticks',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ticks)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Ticks>,
  ): Promise<Ticks[]> {
    try {
      return await this.tasksRepository.ticks(id).find(filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении тиксов');
    }
  }

  @post('/tasks/{id}/ticks', {
    responses: {
      '200': {
        description: 'Tasks model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ticks)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tasks.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticks, {
            title: 'NewTicksInTasks',
            exclude: ['id'],
            optional: ['taskId'],
          }),
        },
      },
    })
    ticks: Omit<Ticks, 'id'>,
  ): Promise<Ticks> {
    try {
      return await this.tasksRepository.ticks(id).create(ticks);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при создании тиксов');
    }
  }

  @patch('/tasks/{id}/ticks', {
    responses: {
      '200': {
        description: 'Tasks.Ticks PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticks, {partial: true}),
        },
      },
    })
    ticks: Partial<Ticks>,
    @param.query.object('where', getWhereSchemaFor(Ticks)) where?: Where<Ticks>,
  ): Promise<Count> {
    try {
      return await this.tasksRepository.ticks(id).patch(ticks, where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении тиксов');
    }
  }

  @del('/tasks/{id}/ticks', {
    responses: {
      '200': {
        description: 'Tasks.Ticks DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Ticks)) where?: Where<Ticks>,
  ): Promise<Count> {
    try {
      return await this.tasksRepository.ticks(id).delete(where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при удалении тиксов');
    }
  }
}
