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
import { Staff } from '../models';
import { StaffRepository } from '../repositories';

export class StaffController {
  constructor(
    @repository(StaffRepository)
    public staffRepository: StaffRepository,
  ) { }

  @post('/staff', {
    responses: {
      '200': {
        description: 'Staff model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Staff) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Staff)
        },
      },
    })
    staff: Omit<Staff, 'id'>,
  ): Promise<Staff> {
    return this.staffRepository.create(staff);
  }

  @get('/staff/count', {
    responses: {
      '200': {
        description: 'Staff model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Staff)) where?: Where<Staff>,
  ): Promise<Count> {
    return this.staffRepository.count(where);
  }

  @get('/staff', {
    responses: {
      '200': {
        description: 'Array of Staff model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Staff) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Staff)) filter?: Filter<Staff>,
  ): Promise<Staff[]> {
    return this.staffRepository.find(filter);
  }

  @patch('/staff', {
    responses: {
      '200': {
        description: 'Staff PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Staff, { partial: true }),
        },
      },
    })
    staff: Staff,
    @param.query.object('where', getWhereSchemaFor(Staff)) where?: Where<Staff>,
  ): Promise<Count> {
    return this.staffRepository.updateAll(staff, where);
  }

  @get('/staff/{id}', {
    responses: {
      '200': {
        description: 'Staff model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Staff) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Staff> {
    return this.staffRepository.findById(id);
  }

  @patch('/staff/{id}', {
    responses: {
      '204': {
        description: 'Staff PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Staff, { partial: true }),
        },
      },
    })
    staff: Staff,
  ): Promise<void> {
    await this.staffRepository.updateById(id, staff);
  }

  @put('/staff/{id}', {
    responses: {
      '204': {
        description: 'Staff PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() staff: Staff,
  ): Promise<void> {
    await this.staffRepository.replaceById(id, staff);
  }

  @del('/staff/{id}', {
    responses: {
      '204': {
        description: 'Staff DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.staffRepository.deleteById(id);
  }
}
