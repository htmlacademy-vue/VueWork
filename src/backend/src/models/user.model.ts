import {Entity, model, hasOne, property, hasMany} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';
import {Tasks, TasksWithRelations} from './tasks.model';
import {Comments, CommentsWithRelations} from './comments.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isAdmin?: boolean;

  @property({
    type: 'string',
  })
  avatar?: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  @hasMany(() => Tasks)
  tasks: Tasks[];

  @hasMany(() => Comments)
  comments: Comments[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface CustomUserRelations {
  // describe navigational properties here
  tasks?: TasksWithRelations[];
  comments?: CommentsWithRelations[];
}

export type CustomUserWithRelations = User & CustomUserRelations;
