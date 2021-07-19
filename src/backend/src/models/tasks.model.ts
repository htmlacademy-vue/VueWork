import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Columns, ColumnsWithRelations} from './columns.model';
import {Comments, CommentsWithRelations} from './comments.model';
import { Ticks, TicksWithRelations } from './ticks.model'
import {Statuses} from './statuses.model';
import {User, CustomUserWithRelations} from './user.model';

@model()
export class Tasks extends Entity {
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
  title: string;

  @property({
    type: 'string',
    jsonSchema: {
      nullable: true
    }
  })
  description?: string;

  @property({
    type: 'number',
    required: true,
  })
  sortOrder: number;

  @property({
    type: 'date',
    jsonSchema: {
      nullable: true
    }
  })
  dueDate?: string;
  @property({
    type: 'string',
    jsonSchema: {
      nullable: true
    }
  })
  url?: string;

  @property({
    type: 'string',
    jsonSchema: {
      nullable: true
    }
  })
  urlDescription?: string;

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
  
  @property({
    type: 'string',
    jsonSchema: {
      nullable: true
    }
  })
  tags?: string;

  @hasMany(() => Comments, {keyTo: 'taskId'})
  comments: Comments[];

  @hasMany(() => Ticks, {keyTo: 'taskId'})
  ticks: Ticks[];

  @belongsTo(() => Columns, {}, {jsonSchema: {nullable: true}})
  columnId: number;

  @belongsTo(() => Statuses, {}, {jsonSchema: {nullable: true}})
  statusId: number;

  @belongsTo(() => User, {}, {jsonSchema: {nullable: true}})
  userId: string;

  constructor(data?: Partial<Tasks>) {
    super(data);
  }
}

export interface TasksRelations {
  // describe navigational properties here
  columns?: ColumnsWithRelations;
  comments?: CommentsWithRelations[];
  user?: CustomUserWithRelations;
  ticks?: TicksWithRelations[];
}

export type TasksWithRelations = Tasks & TasksRelations;
