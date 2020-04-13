import {DefaultCrudRepository} from '@loopback/repository';
import {Order, OrderRelations} from '../models';
import {Db2DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.orderID,
  OrderRelations
> {
  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource,
  ) {
    super(Order, dataSource);
  }
}
