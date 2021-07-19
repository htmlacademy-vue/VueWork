import {repository} from '@loopback/repository';
import { param, get, getModelSchemaRef, HttpErrors, oas, OperationVisibility } from '@loopback/rest'
import {Tasks, User} from '../models';
import {TasksRepository} from '../repositories';

@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class TasksUserController {
  constructor(
    @repository(TasksRepository)
    public tasksRepository: TasksRepository,
  ) {}

  @get('/tasks/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Tasks',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(@param.path.number('id') id: typeof Tasks.prototype.id): Promise<User> {
    try {
      return await this.tasksRepository.user(id);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении юзера');
    }
  }
}
