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
import {User, Tasks} from '../models';
import {UserRepository} from '../repositories';

@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class UserTasksController {
  constructor(@repository(UserRepository) protected userRepository: UserRepository) {}

  @get('/users/{id}/tasks', {
    responses: {
      '200': {
        description: 'Array of User has many Tasks',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tasks)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Tasks>,
  ): Promise<Tasks[]> {
    try {
      return await this.userRepository.tasks(id).find(filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении задач');
    }
  }

  @post('/users/{id}/tasks', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tasks)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {
            title: 'NewTasksInUser',
            exclude: ['id'],
            optional: ['userId'],
          }),
        },
      },
    })
    tasks: Omit<Tasks, 'id'>,
  ): Promise<Tasks> {
    try {
      return await this.userRepository.tasks(id).create(tasks);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при создании задач');
    }
  }

  @patch('/users/{id}/tasks', {
    responses: {
      '200': {
        description: 'User.Tasks PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
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
      return await this.userRepository.tasks(id).patch(tasks, where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении задач');
    }
  }

  @del('/users/{id}/tasks', {
    responses: {
      '200': {
        description: 'User.Tasks DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Tasks)) where?: Where<Tasks>,
  ): Promise<Count> {
    try {
      return await this.userRepository.tasks(id).delete(where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при удалении задач');
    }
  }
}
