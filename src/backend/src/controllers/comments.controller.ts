import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  HttpErrors,
  oas,
  OperationVisibility
} from '@loopback/rest'
import {Comments} from '../models';
import {CommentsRepository} from '../repositories';

export class CommentsController {
  constructor(
    @repository(CommentsRepository)
    public commentsRepository: CommentsRepository,
  ) {}

  @post('/comments', {
    responses: {
      '200': {
        description: 'Comments model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comments)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comments, {
            title: 'NewComments',
            exclude: ['id'],
          }),
        },
      },
    })
    comments: Omit<Comments, 'id'>,
  ): Promise<Comments> {
    try {
      return await this.commentsRepository.create(comments);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при создании комментария');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @get('/comments/count', {
    responses: {
      '200': {
        description: 'Comments model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Comments) where?: Where<Comments>): Promise<Count> {
    try {
      return await this.commentsRepository.count(where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении количества комментариев');
    }
  }

  @get('/comments', {
    responses: {
      '200': {
        description: 'Array of Comments model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Comments, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Comments) filter?: Filter<Comments>): Promise<Comments[]> {
    try {
      return await this.commentsRepository.find(filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении комментария');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @patch('/comments', {
    responses: {
      '200': {
        description: 'Comments PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comments, {partial: true}),
        },
      },
    })
    comments: Comments,
    @param.where(Comments) where?: Where<Comments>,
  ): Promise<Count> {
    try {
      return await this.commentsRepository.updateAll(comments, where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении комментариев');
    }
  }

  @get('/comments/{id}', {
    responses: {
      '200': {
        description: 'Comments model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Comments, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Comments, {exclude: 'where'}) filter?: FilterExcludingWhere<Comments>,
  ): Promise<Comments> {
    try {
      return await this.commentsRepository.findById(id, filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении комментария');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @patch('/comments/{id}', {
    responses: {
      '204': {
        description: 'Comments PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comments, {partial: true}),
        },
      },
    })
    comments: Comments,
  ): Promise<void> {
    try {
      await this.commentsRepository.updateById(id, comments);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении комментария');
    }
  }

  @put('/comments/{id}', {
    responses: {
      '204': {
        description: 'Comments PUT success',
      },
    },
  })
  async replaceById(@param.path.number('id') id: number, @requestBody() comments: Comments): Promise<void> {
    try {
      await this.commentsRepository.replaceById(id, comments);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении комментария');
    }
  }

  @del('/comments/{id}', {
    responses: {
      '204': {
        description: 'Comments DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    try {
      await this.commentsRepository.deleteById(id);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при удалении комментария');
    }
  }
}
