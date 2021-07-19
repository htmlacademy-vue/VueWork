import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Tasks} from './tasks.model';

@model()
export class Ticks extends Entity {
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
    type: 'boolean',
    required: true,
  })
  done: boolean;

  @belongsTo(() => Tasks, {}, {jsonSchema: {nullable: true}})
  taskId: number;

  constructor(data?: Partial<Ticks>) {
    super(data);
  }
}

export interface TicksRelations {
  // describe navigational properties here
}

export type TicksWithRelations = Ticks & TicksRelations;
