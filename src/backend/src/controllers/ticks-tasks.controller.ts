import {repository} from '@loopback/repository';
import { param, get, getModelSchemaRef, HttpErrors, oas, OperationVisibility } from '@loopback/rest'
import {Ticks, Tasks} from '../models';
import {TicksRepository} from '../repositories';

@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class TicksTasksController {
  constructor(
    @repository(TicksRepository)
    public ticksRepository: TicksRepository,
  ) {}

  @get('/ticks/{id}/tasks', {
    responses: {
      '200': {
        description: 'Tasks belonging to Ticks',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tasks)},
          },
        },
      },
    },
  })
  async getTasks(@param.path.number('id') id: typeof Ticks.prototype.id): Promise<Tasks> {
    try {
      return await this.ticksRepository.task(id);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении задачи');
    }
  }
}
