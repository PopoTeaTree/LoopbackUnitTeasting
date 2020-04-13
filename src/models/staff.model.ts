import { Entity, model, property, hasMany } from '@loopback/repository';
import { Order } from './order.model';
import { Bill } from './bill.model';
import {Role} from './role.model';

@model()
export class Staff extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  staffID?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  position: string;

  @property({
    type: 'date',
    required: true,
  })
  DOB: string;

  @property({
    type: 'number',
    default: 2,
    required: true,
  })
  roleID?: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  Tel: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => Order, { keyTo: 'staffStaffId' })
  orders: Order[];

  @hasMany(() => Bill, { keyTo: 'staffStaffId' })
  bills: Bill[];

  @hasMany(() => Role, {keyTo: 'staffStaffId'})
  roles: Role[];

  constructor(data?: Partial<Staff>) {
    super(data);
  }
}

export interface StaffRelations {
  // describe navigational properties here
}

export type StaffWithRelations = Staff & StaffRelations;
