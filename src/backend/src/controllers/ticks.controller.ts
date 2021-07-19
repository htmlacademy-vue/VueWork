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
import {Ticks} from '../models';
import {TicksRepository} from '../repositories';

export class TicksController {
  constructor(
    @repository(TicksRepository)
    public ticksRepository: TicksRepository,
  ) {}

  @post('/ticks', {
    responses: {
      '200': {
        description: 'Ticks model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ticks)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticks, {
            title: 'NewTicks',
            exclude: ['id'],
          }),
        },
      },
    })
    ticks: Omit<Ticks, 'id'>,
  ): Promise<Ticks> {
    try {
      return await this.ticksRepository.create(ticks);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при создании тикса');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @get('/ticks/count', {
    responses: {
      '200': {
        description: 'Ticks model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Ticks) where?: Where<Ticks>): Promise<Count> {
    try {
      return await this.ticksRepository.count(where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении количества тиксов');
    }
  }

  @get('/ticks', {
    responses: {
      '200': {
        description: 'Array of Ticks model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ticks, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Ticks) filter?: Filter<Ticks>): Promise<Ticks[]> {
    try {
      return await this.ticksRepository.find(filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении тикса');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @patch('/ticks', {
    responses: {
      '200': {
        description: 'Ticks PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticks, {partial: true}),
        },
      },
    })
    ticks: Ticks,
    @param.where(Ticks) where?: Where<Ticks>,
  ): Promise<Count> {
    try {
      return await this.ticksRepository.updateAll(ticks, where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении тиксов');
    }
  }

  @get('/ticks/{id}', {
    responses: {
      '200': {
        description: 'Ticks model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ticks, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Ticks, {exclude: 'where'}) filter?: FilterExcludingWhere<Ticks>,
  ): Promise<Ticks> {
    try {
      return await this.ticksRepository.findById(id, filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении тикса');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @patch('/ticks/{id}', {
    responses: {
      '204': {
        description: 'Ticks PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticks, {partial: true}),
        },
      },
    })
    ticks: Ticks,
  ): Promise<void> {
    try {
      await this.ticksRepository.updateById(id, ticks);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении тикса');
    }
  }

  @put('/ticks/{id}', {
    responses: {
      '204': {
        description: 'Ticks PUT success',
      },
    },
  })
  async replaceById(@param.path.number('id') id: number, @requestBody() ticks: Ticks): Promise<void> {
    try {
      await this.ticksRepository.replaceById(id, ticks);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении тикса');
    }
  }

  @del('/ticks/{id}', {
    responses: {
      '204': {
        description: 'Ticks DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    try {
      await this.ticksRepository.deleteById(id);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при удалении тикса');
    }
  }
}
