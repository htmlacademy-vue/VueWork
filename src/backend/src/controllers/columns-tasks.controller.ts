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
import {Columns, Tasks} from '../models';
import {ColumnsRepository} from '../repositories';

@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class ColumnsTasksController {
  constructor(@repository(ColumnsRepository) protected columnsRepository: ColumnsRepository) {}

  @get('/columns/{id}/tasks', {
    responses: {
      '200': {
        description: 'Array of Columns has many Tasks',
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
      return await this.columnsRepository.tasks(id).find(filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении задач');
    }
  }

  @post('/columns/{id}/tasks', {
    responses: {
      '200': {
        description: 'Columns model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tasks)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Columns.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {
            title: 'NewTasksInColumns',
            exclude: ['id'],
            optional: ['columnId'],
          }),
        },
      },
    })
    tasks: Omit<Tasks, 'id'>,
  ): Promise<Tasks> {
    try {
      return await this.columnsRepository.tasks(id).create(tasks);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при создании задачи');
    }
  }

  @patch('/columns/{id}/tasks', {
    responses: {
      '200': {
        description: 'Columns.Tasks PATCH success count',
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
      return await this.columnsRepository.tasks(id).patch(tasks, where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении задачи');
    }
  }

  @del('/columns/{id}/tasks', {
    responses: {
      '200': {
        description: 'Columns.Tasks DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tasks)) where?: Where<Tasks>,
  ): Promise<Count> {
    try {
      return await this.columnsRepository.tasks(id).delete(where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при удалении задачи');
    }
  }
}
