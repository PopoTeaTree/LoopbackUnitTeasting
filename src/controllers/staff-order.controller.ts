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
  Order,
} from '../models';
import {StaffRepository} from '../repositories';

export class StaffOrderController {
  constructor(
    @repository(StaffRepository) protected staffRepository: StaffRepository,
  ) { }

  @get('/staff/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Order\'s belonging to Staff',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.staffRepository.orders(id).find(filter);
  }

  @post('/staff/{id}/orders', {
    responses: {
      '200': {
        description: 'Staff model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Staff.prototype.staffID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInStaff',
            exclude: ['orderID'],
            optional: ['staffStaffId']
          }),
        },
      },
    }) order: Omit<Order, 'orderID'>,
  ): Promise<Order> {
    return this.staffRepository.orders(id).create(order);
  }

  @patch('/staff/{id}/orders', {
    responses: {
      '200': {
        description: 'Staff.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.staffRepository.orders(id).patch(order, where);
  }

  @del('/staff/{id}/orders', {
    responses: {
      '200': {
        description: 'Staff.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.staffRepository.orders(id).delete(where);
  }
}
