import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Membership,
  Bill,
} from '../models';
import {MembershipRepository} from '../repositories';

export class MembershipBillController {
  constructor(
    @repository(MembershipRepository) protected membershipRepository: MembershipRepository,
  ) { }

  @get('/memberships/{id}/bills', {
    responses: {
      '200': {
        description: 'Array of Bill\'s belonging to Membership',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Bill)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Bill>,
  ): Promise<Bill[]> {
    return this.membershipRepository.bills(id).find(filter);
  }

  @post('/memberships/{id}/bills', {
    responses: {
      '200': {
        description: 'Membership model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bill)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Membership.prototype.memID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bill, {
            title: 'NewBillInMembership',
            exclude: ['billID'],
            optional: ['membershipMemId']
          }),
        },
      },
    }) bill: Omit<Bill, 'billID'>,
  ): Promise<Bill> {
    return this.membershipRepository.bills(id).create(bill);
  }

  @patch('/memberships/{id}/bills', {
    responses: {
      '200': {
        description: 'Membership.Bill PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bill, {partial: true}),
        },
      },
    })
    bill: Partial<Bill>,
    @param.query.object('where', getWhereSchemaFor(Bill)) where?: Where<Bill>,
  ): Promise<Count> {
    return this.membershipRepository.bills(id).patch(bill, where);
  }

  @del('/memberships/{id}/bills', {
    responses: {
      '200': {
        description: 'Membership.Bill DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Bill)) where?: Where<Bill>,
  ): Promise<Count> {
    return this.membershipRepository.bills(id).delete(where);
  }
}
