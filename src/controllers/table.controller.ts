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
import { Table } from '../models';
import { TableRepository } from '../repositories';

export class TableController {
  constructor(
    @repository(TableRepository)
    public tableRepository: TableRepository,
  ) { }

  @post('/tables', {
    responses: {
      '200': {
        description: 'Table model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Table) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Table)
        },
      },
    })
    table: Omit<Table, 'id'>,
  ): Promise<Table> {
    return this.tableRepository.create(table);
  }

  @get('/tables/count', {
    responses: {
      '200': {
        description: 'Table model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Table)) where?: Where<Table>,
  ): Promise<Count> {
    return this.tableRepository.count(where);
  }

  @get('/tables', {
    responses: {
      '200': {
        description: 'Array of Table model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Table) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Table)) filter?: Filter<Table>,
  ): Promise<Table[]> {
    return this.tableRepository.find(filter);
  }

  @patch('/tables', {
    responses: {
      '200': {
        description: 'Table PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Table, { partial: true }),
        },
      },
    })
    table: Table,
    @param.query.object('where', getWhereSchemaFor(Table)) where?: Where<Table>,
  ): Promise<Count> {
    return this.tableRepository.updateAll(table, where);
  }

  @get('/tables/{id}', {
    responses: {
      '200': {
        description: 'Table model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Table) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Table> {
    return this.tableRepository.findById(id);
  }

  @patch('/tables/{id}', {
    responses: {
      '204': {
        description: 'Table PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Table, { partial: true }),
        },
      },
    })
    table: Table,
  ): Promise<void> {
    await this.tableRepository.updateById(id, table);
  }

  @put('/tables/{id}', {
    responses: {
      '204': {
        description: 'Table PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() table: Table,
  ): Promise<void> {
    await this.tableRepository.replaceById(id, table);
  }

  @del('/tables/{id}', {
    responses: {
      '204': {
        description: 'Table DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tableRepository.deleteById(id);
  }
}
