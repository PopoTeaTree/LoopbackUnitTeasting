import {Entity, model, property, hasMany} from '@loopback/repository';
import {Menu} from './menu.model';

@model()
export class Discount extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  disID?: number;

  @property({
    type: 'number',
    required: true,
  })
  percent: number;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
  })
  endDate?: string;

  @hasMany(() => Menu, {keyTo: 'discountDisId'})
  menus: Menu[];

  constructor(data?: Partial<Discount>) {
    super(data);
  }
}

export interface DiscountRelations {
  // describe navigational properties here
}

export type DiscountWithRelations = Discount & DiscountRelations;
