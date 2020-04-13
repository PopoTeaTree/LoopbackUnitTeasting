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
  Table,
  Order,
} from '../models';
import {TableRepository} from '../repositories';

export class TableOrderController {
  constructor(
    @repository(TableRepository) protected tableRepository: TableRepository,
  ) { }

  @get('/tables/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Order\'s belonging to Table',
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
    return this.tableRepository.orders(id).find(filter);
  }

  @post('/tables/{id}/orders', {
    responses: {
      '200': {
        description: 'Table model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Table.prototype.tableID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInTable',
            exclude: ['orderID'],
            optional: ['tableTableId']
          }),
        },
      },
    }) order: Omit<Order, 'orderID'>,
  ): Promise<Order> {
    return this.tableRepository.orders(id).create(order);
  }

  @patch('/tables/{id}/orders', {
    responses: {
      '200': {
        description: 'Table.Order PATCH success count',
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
    return this.tableRepository.orders(id).patch(order, where);
  }

  @del('/tables/{id}/orders', {
    responses: {
      '200': {
        description: 'Table.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.tableRepository.orders(id).delete(where);
  }
}
