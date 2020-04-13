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
  Bill,
  Order,
} from '../models';
import {BillRepository} from '../repositories';

export class BillOrderController {
  constructor(
    @repository(BillRepository) protected billRepository: BillRepository,
  ) { }

  @get('/bills/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Order\'s belonging to Bill',
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
    return this.billRepository.orders(id).find(filter);
  }

  @post('/bills/{id}/orders', {
    responses: {
      '200': {
        description: 'Bill model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Bill.prototype.billID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInBill',
            exclude: ['orderID'],
            optional: ['billBillId']
          }),
        },
      },
    }) order: Omit<Order, 'orderID'>,
  ): Promise<Order> {
    return this.billRepository.orders(id).create(order);
  }

  @patch('/bills/{id}/orders', {
    responses: {
      '200': {
        description: 'Bill.Order PATCH success count',
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
    return this.billRepository.orders(id).patch(order, where);
  }

  @del('/bills/{id}/orders', {
    responses: {
      '200': {
        description: 'Bill.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.billRepository.orders(id).delete(where);
  }
}
