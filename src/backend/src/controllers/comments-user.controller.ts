import {repository} from '@loopback/repository';
import { param, get, getModelSchemaRef, HttpErrors, oas, OperationVisibility } from '@loopback/rest'
import {Comments, User} from '../models';
import {CommentsRepository} from '../repositories';

@oas.visibility(OperationVisibility.UNDOCUMENTED)
export class CommentsUserController {
  constructor(
    @repository(CommentsRepository)
    public commentsRepository: CommentsRepository,
  ) {}

  @get('/comments/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Comments',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(@param.path.number('id') id: typeof Comments.prototype.id): Promise<User> {
    try {
      return await this.commentsRepository.user(id);
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении юзера');
    }
  }
}
