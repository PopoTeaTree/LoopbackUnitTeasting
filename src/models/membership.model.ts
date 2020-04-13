import { Entity, model, property, hasMany } from '@loopback/repository';
import { Bill } from './bill.model';
import {Role} from './role.model';

@model()
export class Membership extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  memID?: number;

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
  Tel: string;

  @property({
    type: 'number',
    default: 1,
    required: true,
  })
  roleID?: number;

  @property({
    type: 'date',
    required: true,
  })
  DOB: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @hasMany(() => Bill, { keyTo: 'membershipMemId' })
  bills: Bill[];

  @hasMany(() => Role, {keyTo: 'RoleID'})
  roles: Role[];

  constructor(data?: Partial<Membership>) {
    super(data);
  }
}

export interface MembershipRelations {
  // describe navigational properties here
}

export type MembershipWithRelations = Membership & MembershipRelations;
