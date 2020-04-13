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
  Role,
} from '../models';
import {StaffRepository} from '../repositories';

export class StaffRoleController {
  constructor(
    @repository(StaffRepository) protected staffRepository: StaffRepository,
  ) { }

  @get('/staff/{id}/roles', {
    responses: {
      '200': {
        description: 'Array of Role\'s belonging to Staff',
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
    return this.staffRepository.roles(id).find(filter);
  }

  @post('/staff/{id}/roles', {
    responses: {
      '200': {
        description: 'Staff model instance',
        content: {'application/json': {schema: getModelSchemaRef(Role)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Staff.prototype.staffID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Role, {
            title: 'NewRoleInStaff',
            exclude: ['RoleID'],
            optional: ['staffStaffId']
          }),
        },
      },
    }) role: Omit<Role, 'RoleID'>,
  ): Promise<Role> {
    return this.staffRepository.roles(id).create(role);
  }

  @patch('/staff/{id}/roles', {
    responses: {
      '200': {
        description: 'Staff.Role PATCH success count',
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
    return this.staffRepository.roles(id).patch(role, where);
  }

  @del('/staff/{id}/roles', {
    responses: {
      '200': {
        description: 'Staff.Role DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Role)) where?: Where<Role>,
  ): Promise<Count> {
    return this.staffRepository.roles(id).delete(where);
  }
}
