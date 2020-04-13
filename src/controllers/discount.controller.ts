import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Discount } from '../models';
import { DiscountRepository } from '../repositories';

export class DiscountController {
  constructor(
    @repository(DiscountRepository)
    public discountRepository: DiscountRepository,
  ) { }

  @post('/discounts', {
    responses: {
      '200': {
        description: 'Discount model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Discount) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Discount),
        },
      },
    })
    discount: Omit<Discount, 'id'>,
  ): Promise<Discount> {
    return this.discountRepository.create(discount);
  }

  @get('/discounts/count', {
    responses: {
      '200': {
        description: 'Discount model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Discount)) where?: Where<Discount>,
  ): Promise<Count> {
    return this.discountRepository.count(where);
  }

  @get('/discounts', {
    responses: {
      '200': {
        description: 'Array of Discount model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Discount) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Discount)) filter?: Filter<Discount>,
  ): Promise<Discount[]> {
    return this.discountRepository.find(filter);
  }

  @patch('/discounts', {
    responses: {
      '200': {
        description: 'Discount PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Discount, { partial: true }),
        },
      },
    })
    discount: Discount,
    @param.query.object('where', getWhereSchemaFor(Discount)) where?: Where<Discount>,
  ): Promise<Count> {
    return this.discountRepository.updateAll(discount, where);
  }

  @get('/discounts/{id}', {
    responses: {
      '200': {
        description: 'Discount model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Discount) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Discount> {
    return this.discountRepository.findById(id);
  }

  @patch('/discounts/{id}', {
    responses: {
      '204': {
        description: 'Discount PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Discount, { partial: true }),
        },
      },
    })
    discount: Discount,
  ): Promise<void> {
    await this.discountRepository.updateById(id, discount);
  }

  @put('/discounts/{id}', {
    responses: {
      '204': {
        description: 'Discount PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() discount: Discount,
  ): Promise<void> {
    await this.discountRepository.replaceById(id, discount);
  }

  @del('/discounts/{id}', {
    responses: {
      '204': {
        description: 'Discount DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.discountRepository.deleteById(id);
  }
}
