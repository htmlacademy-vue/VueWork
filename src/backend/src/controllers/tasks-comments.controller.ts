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
import {Tasks, Comments} from '../models';
import {TasksRepository} from '../repositories';

@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class TasksCommentsController {
  constructor(@repository(TasksRepository) protected tasksRepository: TasksRepository) {}

  @get('/tasks/{id}/comments', {
    responses: {
      '200': {
        description: 'Array of Tasks has many Comments',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comments)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Comments>,
  ): Promise<Comments[]> {
    try {
      return await this.tasksRepository.comments(id).find(filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении комментариев');
    }
  }

  @post('/tasks/{id}/comments', {
    responses: {
      '200': {
        description: 'Tasks model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comments)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tasks.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comments, {
            title: 'NewCommentsInTasks',
            exclude: ['id'],
            optional: ['taskId'],
          }),
        },
      },
    })
    comments: Omit<Comments, 'id'>,
  ): Promise<Comments> {
    try {
      return await this.tasksRepository.comments(id).create(comments);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при создании комментариев');
    }
  }

  @patch('/tasks/{id}/comments', {
    responses: {
      '200': {
        description: 'Tasks.Comments PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comments, {partial: true}),
        },
      },
    })
    comments: Partial<Comments>,
    @param.query.object('where', getWhereSchemaFor(Comments)) where?: Where<Comments>,
  ): Promise<Count> {
    try {
      return await this.tasksRepository.comments(id).patch(comments, where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении комментариев');
    }
  }

  @del('/tasks/{id}/comments', {
    responses: {
      '200': {
        description: 'Tasks.Comments DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comments)) where?: Where<Comments>,
  ): Promise<Count> {
    try {
      return await this.tasksRepository.comments(id).delete(where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при удалении комментариев');
    }
  }
}
