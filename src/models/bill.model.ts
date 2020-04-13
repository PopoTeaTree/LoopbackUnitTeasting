import { Entity, model, property, hasMany } from '@loopback/repository';
import { Order } from './order.model';

@model()
export class Bill extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  billID?: number;

  @property({
    type: 'string',
  })
  method?: string;

  @property({
    type: 'date',
  })
  dateTime?: string;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  total: number;

  @property({
    type: 'number',
  })
  staffStaffId?: number;

  @hasMany(() => Order, { keyTo: 'billBillId' })
  orders: Order[];

  @property({
    type: 'number',
    default: 0,
  })
  promotionProId?: number;

  @property({
    type: 'number',
  })
  membershipMemId?: number;

  constructor(data?: Partial<Bill>) {
    super(data);
  }
}

export interface BillRelations {
  // describe navigational properties here
}

export type BillWithRelations = Bill & BillRelations;
