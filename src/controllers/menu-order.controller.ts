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
  Menu,
  Order,
} from '../models';
import {MenuRepository} from '../repositories';

export class MenuOrderController {
  constructor(
    @repository(MenuRepository) protected menuRepository: MenuRepository,
  ) { }

  @get('/menus/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Order\'s belonging to Menu',
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
    return this.menuRepository.orders(id).find(filter);
  }

  @post('/menus/{id}/orders', {
    responses: {
      '200': {
        description: 'Menu model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Menu.prototype.menuID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInMenu',
            exclude: ['orderID'],
            optional: ['menuMenuId']
          }),
        },
      },
    }) order: Omit<Order, 'orderID'>,
  ): Promise<Order> {
    return this.menuRepository.orders(id).create(order);
  }

  @patch('/menus/{id}/orders', {
    responses: {
      '200': {
        description: 'Menu.Order PATCH success count',
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
    return this.menuRepository.orders(id).patch(order, where);
  }

  @del('/menus/{id}/orders', {
    responses: {
      '200': {
        description: 'Menu.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.menuRepository.orders(id).delete(where);
  }
}
