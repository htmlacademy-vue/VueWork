import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Tasks, TasksWithRelations} from './tasks.model';
import {User, CustomUserWithRelations} from './user.model';

@model()
export class Comments extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'string',
    required: true,
  })
  text: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  updatedAt?: string;

  @belongsTo(() => Tasks, {}, {jsonSchema: {nullable: true}})
  taskId: number;

  @belongsTo(() => User, {}, {jsonSchema: {nullable: true}})
  userId: string;

  constructor(data?: Partial<Comments>) {
    super(data);
  }
}

export interface CommentsRelations {
  // describe navigational properties here
  task?: TasksWithRelations;
  user?: CustomUserWithRelations;
}

export type CommentsWithRelations = Comments & CommentsRelations;
