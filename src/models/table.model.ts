import {Entity, model, property, hasMany} from '@loopback/repository';
import {Order} from './order.model';

@model()
export class Table extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  tableID?: number;

  @property({
    type: 'number',
    required: true,
  })
  person: number;

  @property({
    type: 'boolean',
  })
  status?: boolean;

  @hasMany(() => Order, {keyTo: 'tableTableId'})
  orders: Order[];

  constructor(data?: Partial<Table>) {
    super(data);
  }
}

export interface TableRelations {
  // describe navigational properties here
}

export type TableWithRelations = Table & TableRelations;
