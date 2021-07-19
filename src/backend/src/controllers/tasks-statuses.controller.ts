import {repository} from '@loopback/repository';
import { param, get, getModelSchemaRef, HttpErrors, oas, OperationVisibility } from '@loopback/rest'
import {Tasks, Statuses} from '../models';
import {TasksRepository} from '../repositories';

@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class TasksStatusesController {
  constructor(
    @repository(TasksRepository)
    public tasksRepository: TasksRepository,
  ) {}

  @get('/tasks/{id}/statuses', {
    responses: {
      '200': {
        description: 'Statuses belonging to Tasks',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Statuses)},
          },
        },
      },
    },
  })
  async getStatuses(@param.path.number('id') id: typeof Tasks.prototype.id): Promise<Statuses> {
    try {
      return await this.tasksRepository.status(id);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении статусов');
    }
  }
}
