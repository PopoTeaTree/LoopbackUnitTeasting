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
  Promotion,
  Bill,
} from '../models';
import {PromotionRepository} from '../repositories';

export class PromotionBillController {
  constructor(
    @repository(PromotionRepository) protected promotionRepository: PromotionRepository,
  ) { }

  @get('/promotions/{id}/bills', {
    responses: {
      '200': {
        description: 'Array of Bill\'s belonging to Promotion',
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
    return this.promotionRepository.bills(id).find(filter);
  }

  @post('/promotions/{id}/bills', {
    responses: {
      '200': {
        description: 'Promotion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bill)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Promotion.prototype.proID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bill, {
            title: 'NewBillInPromotion',
            exclude: ['billID'],
            optional: ['promotionProId']
          }),
        },
      },
    }) bill: Omit<Bill, 'billID'>,
  ): Promise<Bill> {
    return this.promotionRepository.bills(id).create(bill);
  }

  @patch('/promotions/{id}/bills', {
    responses: {
      '200': {
        description: 'Promotion.Bill PATCH success count',
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
    return this.promotionRepository.bills(id).patch(bill, where);
  }

  @del('/promotions/{id}/bills', {
    responses: {
      '200': {
        description: 'Promotion.Bill DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Bill)) where?: Where<Bill>,
  ): Promise<Count> {
    return this.promotionRepository.bills(id).delete(where);
  }
}
