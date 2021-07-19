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
import {Statuses, Tasks} from '../models';
import {StatusesRepository} from '../repositories';

@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class StatusesTasksController {
  constructor(@repository(StatusesRepository) protected statusesRepository: StatusesRepository) {}

  @get('/statuses/{id}/tasks', {
    responses: {
      '200': {
        description: 'Array of Statuses has many Tasks',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tasks)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tasks>,
  ): Promise<Tasks[]> {
    try {
      return await this.statusesRepository.tasks(id).find(filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении задач');
    }
  }

  @post('/statuses/{id}/tasks', {
    responses: {
      '200': {
        description: 'Statuses model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tasks)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Statuses.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {
            title: 'NewTasksInStatuses',
            exclude: ['id'],
            optional: ['statusId'],
          }),
        },
      },
    })
    tasks: Omit<Tasks, 'id'>,
  ): Promise<Tasks> {
    try {
      return await this.statusesRepository.tasks(id).create(tasks);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при создании задач');
    }
  }

  @patch('/statuses/{id}/tasks', {
    responses: {
      '200': {
        description: 'Statuses.Tasks PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {partial: true}),
        },
      },
    })
    tasks: Partial<Tasks>,
    @param.query.object('where', getWhereSchemaFor(Tasks)) where?: Where<Tasks>,
  ): Promise<Count> {
    try {
      return await this.statusesRepository.tasks(id).patch(tasks, where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении задач');
    }
  }

  @del('/statuses/{id}/tasks', {
    responses: {
      '200': {
        description: 'Statuses.Tasks DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tasks)) where?: Where<Tasks>,
  ): Promise<Count> {
    try {
      return await this.statusesRepository.tasks(id).delete(where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при удалении задач');
    }
  }
}
