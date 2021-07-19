import {repository} from '@loopback/repository';
import { param, get, getModelSchemaRef, HttpErrors, oas, OperationVisibility } from '@loopback/rest'
import {Tasks, Columns} from '../models';
import {TasksRepository} from '../repositories';

@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class TasksColumnsController {
  constructor(
    @repository(TasksRepository)
    public tasksRepository: TasksRepository,
  ) {}

  @get('/tasks/{id}/columns', {
    responses: {
      '200': {
        description: 'Columns belonging to Tasks',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Columns)},
          },
        },
      },
    },
  })
  async getColumns(@param.path.number('id') id: typeof Tasks.prototype.id): Promise<Columns> {
    try {
      return await this.tasksRepository.column(id);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении колонок');
    }
  }
}
