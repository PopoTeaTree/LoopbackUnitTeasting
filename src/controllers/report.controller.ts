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
import { Report } from '../models';
import { ReportRepository } from '../repositories';

export class ReportController {
  constructor(
    @repository(ReportRepository)
    public reportRepository: ReportRepository,
  ) { }

  @post('/reports', {
    responses: {
      '200': {
        description: 'Report model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Report) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Report),
        },
      },
    })
    report: Omit<Report, 'id'>,
  ): Promise<Report> {
    return this.reportRepository.create(report);
  }

  @get('/reports/count', {
    responses: {
      '200': {
        description: 'Report model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Report)) where?: Where<Report>,
  ): Promise<Count> {
    return this.reportRepository.count(where);
  }

  @get('/reports', {
    responses: {
      '200': {
        description: 'Array of Report model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Report) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Report)) filter?: Filter<Report>,
  ): Promise<Report[]> {
    return this.reportRepository.find(filter);
  }

  @patch('/reports', {
    responses: {
      '200': {
        description: 'Report PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Report, { partial: true }),
        },
      },
    })
    report: Report,
    @param.query.object('where', getWhereSchemaFor(Report)) where?: Where<Report>,
  ): Promise<Count> {
    return this.reportRepository.updateAll(report, where);
  }

  @get('/reports/{id}', {
    responses: {
      '200': {
        description: 'Report model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Report) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Report> {
    return this.reportRepository.findById(id);
  }

  @patch('/reports/{id}', {
    responses: {
      '204': {
        description: 'Report PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Report, { partial: true }),
        },
      },
    })
    report: Report,
  ): Promise<void> {
    await this.reportRepository.updateById(id, report);
  }

  @put('/reports/{id}', {
    responses: {
      '204': {
        description: 'Report PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() report: Report,
  ): Promise<void> {
    await this.reportRepository.replaceById(id, report);
  }

  @del('/reports/{id}', {
    responses: {
      '204': {
        description: 'Report DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.reportRepository.deleteById(id);
  }
}
