import {DefaultCrudRepository} from '@loopback/repository';
import {Role, RoleRelations} from '../models';
import {Db2DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.RoleID,
  RoleRelations
> {
  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource,
  ) {
    super(Role, dataSource);
  }
}
