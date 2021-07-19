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
import {Statuses} from '../models';
import {StatusesRepository} from '../repositories';

export class StatusesController {
  constructor(
    @repository(StatusesRepository)
    public statusesRepository: StatusesRepository,
  ) {}

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @post('/statuses', {
    responses: {
      '200': {
        description: 'Statuses model instance',
        content: {'application/json': {schema: getModelSchemaRef(Statuses)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Statuses, {
            title: 'NewStatuses',
            exclude: ['id'],
          }),
        },
      },
    })
    statuses: Omit<Statuses, 'id'>,
  ): Promise<Statuses> {
    try {
      return await this.statusesRepository.create(statuses);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при создании статуса');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @get('/statuses/count', {
    responses: {
      '200': {
        description: 'Statuses model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Statuses) where?: Where<Statuses>): Promise<Count> {
    try {
      return await this.statusesRepository.count(where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении количества статусов');
    }
  }

  @get('/statuses', {
    responses: {
      '200': {
        description: 'Array of Statuses model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Statuses, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Statuses) filter?: Filter<Statuses>): Promise<Statuses[]> {
    try {
      return await this.statusesRepository.find(filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении статуса');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @patch('/statuses', {
    responses: {
      '200': {
        description: 'Statuses PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Statuses, {partial: true}),
        },
      },
    })
    statuses: Statuses,
    @param.where(Statuses) where?: Where<Statuses>,
  ): Promise<Count> {
    try {
      return await this.statusesRepository.updateAll(statuses, where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении статусов');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @get('/statuses/{id}', {
    responses: {
      '200': {
        description: 'Statuses model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Statuses, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Statuses, {exclude: 'where'}) filter?: FilterExcludingWhere<Statuses>,
  ): Promise<Statuses> {
    try {
      return await this.statusesRepository.findById(id, filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при поиске статуса');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @patch('/statuses/{id}', {
    responses: {
      '204': {
        description: 'Statuses PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Statuses, {partial: true}),
        },
      },
    })
    statuses: Statuses,
  ): Promise<void> {
    try {
      await this.statusesRepository.updateById(id, statuses);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении статуса');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @put('/statuses/{id}', {
    responses: {
      '204': {
        description: 'Statuses PUT success',
      },
    },
  })
  async replaceById(@param.path.number('id') id: number, @requestBody() statuses: Statuses): Promise<void> {
    try {
      await this.statusesRepository.replaceById(id, statuses);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении статуса');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @del('/statuses/{id}', {
    responses: {
      '204': {
        description: 'Statuses DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    try {
      await this.statusesRepository.deleteById(id);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при удалении статуса');
    }
  }
}
