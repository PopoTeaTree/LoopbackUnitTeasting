import { Entity, model, property, hasMany } from '@loopback/repository';
import { Bill } from './bill.model';

@model()
export class Promotion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  proID?: number;

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
    required: true,
  })
  endDate: string;

  @property({
    type: 'string',
    required: true,
  })
  proCode: string;

  @hasMany(() => Bill, { keyTo: 'promotionProId' })
  bills: Bill[];

  constructor(data?: Partial<Promotion>) {
    super(data);
  }
}

export interface PromotionRelations {
  // describe navigational properties here
}

export type PromotionWithRelations = Promotion & PromotionRelations;
