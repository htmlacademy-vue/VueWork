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
import {User, Comments} from '../models';
import {UserRepository} from '../repositories';

@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class UserCommentsController {
  constructor(@repository(UserRepository) protected userRepository: UserRepository) {}

  @get('/users/{id}/comments', {
    responses: {
      '200': {
        description: 'Array of User has many Comments',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comments)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Comments>,
  ): Promise<Comments[]> {
    try {
      return await this.userRepository.comments(id).find(filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении комментариев');
    }
  }

  @post('/users/{id}/comments', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comments)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comments, {
            title: 'NewCommentsInUser',
            exclude: ['id'],
            optional: ['userId'],
          }),
        },
      },
    })
    comments: Omit<Comments, 'id'>,
  ): Promise<Comments> {
    try {
      return await this.userRepository.comments(id).create(comments);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при создании комментариев');
    }
  }

  @patch('/users/{id}/comments', {
    responses: {
      '200': {
        description: 'User.Comments PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
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
      return await this.userRepository.comments(id).patch(comments, where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении комментариев');
    }
  }

  @del('/users/{id}/comments', {
    responses: {
      '200': {
        description: 'User.Comments DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Comments)) where?: Where<Comments>,
  ): Promise<Count> {
    try {
      return await this.userRepository.comments(id).delete(where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при удалении комментариев');
    }
  }
}
