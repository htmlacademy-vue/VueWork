import {Entity, model, property, hasMany} from '@loopback/repository';
import {Tasks} from './tasks.model';

@model()
export class Statuses extends Entity {
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
  name: string;

  @hasMany(() => Tasks, {keyTo: 'statusId'})
  tasks: Tasks[];

  constructor(data?: Partial<Statuses>) {
    super(data);
  }
}

export interface StatusesRelations {
  // describe navigational properties here
}

export type StatusesWithRelations = Statuses & StatusesRelations;
