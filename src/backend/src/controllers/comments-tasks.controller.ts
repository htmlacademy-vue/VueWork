import {repository} from '@loopback/repository';
import { param, get, getModelSchemaRef, HttpErrors, oas, OperationVisibility } from '@loopback/rest'
import {Comments, Tasks} from '../models';
import {CommentsRepository} from '../repositories';

@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class CommentsTasksController {
  constructor(
    @repository(CommentsRepository)
    public commentsRepository: CommentsRepository,
  ) {}

  @get('/comments/{id}/tasks', {
    responses: {
      '200': {
        description: 'Tasks belonging to Comments',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tasks)},
          },
        },
      },
    },
  })
  async getTasks(@param.path.number('id') id: typeof Comments.prototype.id): Promise<Tasks> {
    try {
      return await this.commentsRepository.task(id);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении задач');
    }
  }
}
