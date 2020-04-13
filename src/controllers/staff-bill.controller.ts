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
  Staff,
  Bill,
} from '../models';
import {StaffRepository} from '../repositories';

export class StaffBillController {
  constructor(
    @repository(StaffRepository) protected staffRepository: StaffRepository,
  ) { }

  @get('/staff/{id}/bills', {
    responses: {
      '200': {
        description: 'Array of Bill\'s belonging to Staff',
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
    return this.staffRepository.bills(id).find(filter);
  }

  @post('/staff/{id}/bills', {
    responses: {
      '200': {
        description: 'Staff model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bill)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Staff.prototype.staffID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bill, {
            title: 'NewBillInStaff',
            exclude: ['billID'],
            optional: ['staffStaffId']
          }),
        },
      },
    }) bill: Omit<Bill, 'billID'>,
  ): Promise<Bill> {
    return this.staffRepository.bills(id).create(bill);
  }

  @patch('/staff/{id}/bills', {
    responses: {
      '200': {
        description: 'Staff.Bill PATCH success count',
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
    return this.staffRepository.bills(id).patch(bill, where);
  }

  @del('/staff/{id}/bills', {
    responses: {
      '200': {
        description: 'Staff.Bill DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Bill)) where?: Where<Bill>,
  ): Promise<Count> {
    return this.staffRepository.bills(id).delete(where);
  }
}
