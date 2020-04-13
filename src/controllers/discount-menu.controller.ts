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
  Discount,
  Menu,
} from '../models';
import {DiscountRepository} from '../repositories';

export class DiscountMenuController {
  constructor(
    @repository(DiscountRepository) protected discountRepository: DiscountRepository,
  ) { }

  @get('/discounts/{id}/menus', {
    responses: {
      '200': {
        description: 'Array of Menu\'s belonging to Discount',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Menu)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Menu>,
  ): Promise<Menu[]> {
    return this.discountRepository.menus(id).find(filter);
  }

  @post('/discounts/{id}/menus', {
    responses: {
      '200': {
        description: 'Discount model instance',
        content: {'application/json': {schema: getModelSchemaRef(Menu)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Discount.prototype.disID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Menu, {
            title: 'NewMenuInDiscount',
            exclude: ['menuID'],
            optional: ['discountDisId']
          }),
        },
      },
    }) menu: Omit<Menu, 'menuID'>,
  ): Promise<Menu> {
    return this.discountRepository.menus(id).create(menu);
  }

  @patch('/discounts/{id}/menus', {
    responses: {
      '200': {
        description: 'Discount.Menu PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Menu, {partial: true}),
        },
      },
    })
    menu: Partial<Menu>,
    @param.query.object('where', getWhereSchemaFor(Menu)) where?: Where<Menu>,
  ): Promise<Count> {
    return this.discountRepository.menus(id).patch(menu, where);
  }

  @del('/discounts/{id}/menus', {
    responses: {
      '200': {
        description: 'Discount.Menu DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Menu)) where?: Where<Menu>,
  ): Promise<Count> {
    return this.discountRepository.menus(id).delete(where);
  }
}
