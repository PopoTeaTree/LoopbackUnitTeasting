import { Entity, model, property, hasMany } from '@loopback/repository';
import { Order } from './order.model';

@model()
export class Menu extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  menuID?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  price: number;

  @property({
    type: 'number',
    default: 0,
  })
  sumRating: number;

  @property({
    type: 'number'
  })
  divideRating: number;

  @property({
    type: 'number'
  })
  rating: number;

  @property({
    type: 'string',
  })
  detail?: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
  })
  img?: string;

  @property({
    type: 'number',
  })
  discountDisId?: number;

  @hasMany(() => Order, { keyTo: 'menuMenuId' })
  orders: Order[];

  constructor(data?: Partial<Menu>) {
    super(data);
  }
}

export interface MenuRelations {
  // describe navigational properties here
}

export type MenuWithRelations = Menu & MenuRelations;
