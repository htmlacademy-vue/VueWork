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
import {Tasks} from '../models';
import {TasksRepository, UserRepository} from '../repositories';

export class TasksController {
  constructor(
    @repository(TasksRepository)
    public tasksRepository: TasksRepository,
    @repository(UserRepository) protected userRepository: UserRepository
  ) {}

  @post('/tasks', {
    responses: {
      '200': {
        description: 'Tasks model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tasks)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {
            title: 'NewTasks',
            exclude: ['id'],
          }),
        },
      },
    })
    tasks: Omit<Tasks, 'id'>,
  ): Promise<Tasks> {
    try {
      const task = await this.tasksRepository.create(tasks);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      task.user = task.userId ? await this.userRepository.findById(task.userId) : null;
      return task;
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при создании задачи');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @get('/tasks/count', {
    responses: {
      '200': {
        description: 'Tasks model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Tasks) where?: Where<Tasks>): Promise<Count> {
    try {
      return await this.tasksRepository.count(where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении количества задач');
    }
  }

  @get('/tasks', {
    responses: {
      '200': {
        description: 'Array of Tasks model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Tasks, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Tasks) filter?: Filter<Tasks>): Promise<Tasks[]> {
    try {
      return await this.tasksRepository.find(filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении задачи');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @patch('/tasks', {
    responses: {
      '200': {
        description: 'Tasks PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {partial: true}),
        },
      },
    })
    tasks: Tasks,
    @param.where(Tasks) where?: Where<Tasks>,
  ): Promise<Count> {
    try {
      return await this.tasksRepository.updateAll(tasks, where);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении задач');
    }
  }

  @get('/tasks/{id}', {
    responses: {
      '200': {
        description: 'Tasks model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tasks, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tasks, {exclude: 'where'}) filter?: FilterExcludingWhere<Tasks>,
  ): Promise<Tasks> {
    try {
      return await this.tasksRepository.findById(id, filter);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении задачи');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @patch('/tasks/{id}', {
    responses: {
      '204': {
        description: 'Tasks PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {partial: true}),
        },
      },
    })
    tasks: Tasks,
  ): Promise<void> {
    try {
      await this.tasksRepository.updateById(id, tasks);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении задачи');
    }
  }

  @put('/tasks/{id}', {
    responses: {
      '204': {
        description: 'Tasks PUT success',
      },
    },
  })
  async replaceById(@param.path.number('id') id: number, @requestBody() tasks: Tasks): Promise<void> {
    try {
      await this.tasksRepository.replaceById(id, tasks);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при обновлении задачи');
    }
  }

  @del('/tasks/{id}', {
    responses: {
      '204': {
        description: 'Tasks DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    try {
      await this.tasksRepository.deleteById(id);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при удалении задачи');
    }
  }
}
