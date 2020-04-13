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
  Membership,
  Role,
} from '../models';
import {MembershipRepository} from '../repositories';

export class MembershipRoleController {
  constructor(
    @repository(MembershipRepository) protected membershipRepository: MembershipRepository,
  ) { }

  @get('/memberships/{id}/roles', {
    responses: {
      '200': {
        description: 'Array of Role\'s belonging to Membership',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Role)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Role>,
  ): Promise<Role[]> {
    return this.membershipRepository.roles(id).find(filter);
  }

  @post('/memberships/{id}/roles', {
    responses: {
      '200': {
        description: 'Membership model instance',
        content: {'application/json': {schema: getModelSchemaRef(Role)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Membership.prototype.memID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Role, {
            title: 'NewRoleInMembership',
            exclude: ['RoleID'],
            optional: ['RoleID']
          }),
        },
      },
    }) role: Omit<Role, 'RoleID'>,
  ): Promise<Role> {
    return this.membershipRepository.roles(id).create(role);
  }

  @patch('/memberships/{id}/roles', {
    responses: {
      '200': {
        description: 'Membership.Role PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Role, {partial: true}),
        },
      },
    })
    role: Partial<Role>,
    @param.query.object('where', getWhereSchemaFor(Role)) where?: Where<Role>,
  ): Promise<Count> {
    return this.membershipRepository.roles(id).patch(role, where);
  }

  @del('/memberships/{id}/roles', {
    responses: {
      '200': {
        description: 'Membership.Role DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Role)) where?: Where<Role>,
  ): Promise<Count> {
    return this.membershipRepository.roles(id).delete(where);
  }
}
