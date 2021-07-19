import {Entity, model, property, hasMany} from '@loopback/repository';
import {Tasks, TasksWithRelations} from './tasks.model';

@model()
export class Columns extends Entity {
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

  @hasMany(() => Tasks, {keyTo: 'columnId'})
  tasks: Tasks[];

  constructor(data?: Partial<Columns>) {
    super(data);
  }
}

export interface ColumnsRelations {
  // describe navigational properties here
  tasks?: TasksWithRelations[];
}

export type ColumnsWithRelations = Columns & ColumnsRelations;
