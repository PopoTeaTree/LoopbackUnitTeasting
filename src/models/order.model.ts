import { Entity, model, property } from '@loopback/repository';

@model()
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  orderID?: number;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  subTotal: number;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  statusEat: string;

  @property({
    type: 'number',
    required: true,
  })
  qty: number;

  @property({
    type: 'number',
  })
  rating?: number;

  @property({
    type: 'number',
  })
  menuMenuId?: number;

  @property({
    type: 'number',
  })
  tableTableId?: number;

  @property({
    type: 'number',
  })
  staffStaffId?: number;

  @property({
    type: 'number',
  })
  billBillId?: number;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
