import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {post, param, get, getModelSchemaRef, patch, put, del, requestBody, HttpErrors, oas, OperationVisibility} from '@loopback/rest';
import {Columns} from '../models';
import {ColumnsRepository} from '../repositories';

export class ColumnsController {
  constructor(
    @repository(ColumnsRepository)
    public columnsRepository: ColumnsRepository,
  ) {}

  @post('/columns', {
    responses: {
      '200': {
        description: 'Columns model instance',
        content: {'application/json': {schema: getModelSchemaRef(Columns)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Columns, {
            title: 'NewColumns',
            exclude: ['id'],
          }),
        },
      },
    })
    columns: Omit<Columns, 'id'>,
  ): Promise<Columns> {
    try {
      return await this.columnsRepository.create(columns);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при создании колонки');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @get('/columns/count', {
    responses: {
      '200': {
        description: 'Columns model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Columns) where?: Where<Columns>): Promise<Count> {
    try {
      return await this.columnsRepository.count(where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении количества столбцов');
    }
  }

  @get('/columns', {
    responses: {
      '200': {
        description: 'Array of Columns model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Columns, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Columns) filter?: Filter<Columns>): Promise<Columns[]> {
    try {
      return await this.columnsRepository.find(filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении столбцов');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @patch('/columns', {
    responses: {
      '200': {
        description: 'Columns PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Columns, {partial: true}),
        },
      },
    })
    columns: Columns,
    @param.where(Columns) where?: Where<Columns>,
  ): Promise<Count> {
    try {
      return await this.columnsRepository.updateAll(columns, where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении столбцов');
    }
  }

  @get('/columns/{id}', {
    responses: {
      '200': {
        description: 'Columns model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Columns, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Columns, {exclude: 'where'}) filter?: FilterExcludingWhere<Columns>,
  ): Promise<Columns> {
    try {
      return await this.columnsRepository.findById(id, filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении столбца');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @patch('/columns/{id}', {
    responses: {
      '204': {
        description: 'Columns PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Columns, {partial: true}),
        },
      },
    })
    columns: Columns,
  ): Promise<void> {
    try {
      await this.columnsRepository.updateById(id, columns);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении столбца');
    }
  }

  @put('/columns/{id}', {
    responses: {
      '204': {
        description: 'Columns PUT success',
      },
    },
  })
  async replaceById(@param.path.number('id') id: number, @requestBody() columns: Columns): Promise<void> {
    try {
      await this.columnsRepository.replaceById(id, columns);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении столбца');
    }
  }

  @del('/columns/{id}', {
    responses: {
      '204': {
        description: 'Columns DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    try {
      await this.columnsRepository.deleteById(id);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении столбца');
    }
  }
}
