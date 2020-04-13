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
import { Promotion } from '../models';
import { PromotionRepository } from '../repositories';

export class PromotionController {
  constructor(
    @repository(PromotionRepository)
    public promotionRepository: PromotionRepository,
  ) { }

  @post('/promotions', {
    responses: {
      '200': {
        description: 'Promotion model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Promotion) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotion)
        },
      },
    })
    promotion: Omit<Promotion, 'id'>,
  ): Promise<Promotion> {
    return this.promotionRepository.create(promotion);
  }

  @get('/promotions/count', {
    responses: {
      '200': {
        description: 'Promotion model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Promotion)) where?: Where<Promotion>,
  ): Promise<Count> {
    return this.promotionRepository.count(where);
  }

  @get('/promotions', {
    responses: {
      '200': {
        description: 'Array of Promotion model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Promotion) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Promotion)) filter?: Filter<Promotion>,
  ): Promise<Promotion[]> {
    return this.promotionRepository.find(filter);
  }

  @patch('/promotions', {
    responses: {
      '200': {
        description: 'Promotion PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotion, { partial: true }),
        },
      },
    })
    promotion: Promotion,
    @param.query.object('where', getWhereSchemaFor(Promotion)) where?: Where<Promotion>,
  ): Promise<Count> {
    return this.promotionRepository.updateAll(promotion, where);
  }

  @get('/promotions/{id}', {
    responses: {
      '200': {
        description: 'Promotion model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Promotion) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Promotion> {
    return this.promotionRepository.findById(id);
  }

  @patch('/promotions/{id}', {
    responses: {
      '204': {
        description: 'Promotion PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotion, { partial: true }),
        },
      },
    })
    promotion: Promotion,
  ): Promise<void> {
    await this.promotionRepository.updateById(id, promotion);
  }

  @put('/promotions/{id}', {
    responses: {
      '204': {
        description: 'Promotion PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() promotion: Promotion,
  ): Promise<void> {
    await this.promotionRepository.replaceById(id, promotion);
  }

  @del('/promotions/{id}', {
    responses: {
      '204': {
        description: 'Promotion DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.promotionRepository.deleteById(id);
  }
}
