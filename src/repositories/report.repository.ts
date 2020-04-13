import {DefaultCrudRepository} from '@loopback/repository';
import {Report, ReportRelations} from '../models';
import {Db2DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ReportRepository extends DefaultCrudRepository<
  Report,
  typeof Report.prototype.reportID,
  ReportRelations
> {
  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource,
  ) {
    super(Report, dataSource);
  }
}
