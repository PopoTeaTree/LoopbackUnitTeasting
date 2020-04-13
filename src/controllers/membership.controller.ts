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
import { Membership } from '../models';
import { MembershipRepository } from '../repositories';

export class MembershipController {
  constructor(
    @repository(MembershipRepository)
    public membershipRepository: MembershipRepository,
  ) { }

  @post('/memberships', {
    responses: {
      '200': {
        description: 'Membership model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Membership) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Membership)
        },
      },
    })
    membership: Omit<Membership, 'id'>,
  ): Promise<Membership> {
    return this.membershipRepository.create(membership);
  }

  @get('/memberships/count', {
    responses: {
      '200': {
        description: 'Membership model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Membership)) where?: Where<Membership>,
  ): Promise<Count> {
    return this.membershipRepository.count(where);
  }

  @get('/memberships', {
    responses: {
      '200': {
        description: 'Array of Membership model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Membership) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Membership)) filter?: Filter<Membership>,
  ): Promise<Membership[]> {
    return this.membershipRepository.find(filter);
  }

  @patch('/memberships', {
    responses: {
      '200': {
        description: 'Membership PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Membership, { partial: true }),
        },
      },
    })
    membership: Membership,
    @param.query.object('where', getWhereSchemaFor(Membership)) where?: Where<Membership>,
  ): Promise<Count> {
    return this.membershipRepository.updateAll(membership, where);
  }

  @get('/memberships/{id}', {
    responses: {
      '200': {
        description: 'Membership model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Membership) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Membership> {
    return this.membershipRepository.findById(id);
  }

  @patch('/memberships/{id}', {
    responses: {
      '204': {
        description: 'Membership PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Membership, { partial: true }),
        },
      },
    })
    membership: Membership,
  ): Promise<void> {
    await this.membershipRepository.updateById(id, membership);
  }

  @put('/memberships/{id}', {
    responses: {
      '204': {
        description: 'Membership PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() membership: Membership,
  ): Promise<void> {
    await this.membershipRepository.replaceById(id, membership);
  }

  @del('/memberships/{id}', {
    responses: {
      '204': {
        description: 'Membership DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.membershipRepository.deleteById(id);
  }
}
