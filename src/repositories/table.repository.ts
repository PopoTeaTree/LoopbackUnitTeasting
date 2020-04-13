import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Table, TableRelations, Order} from '../models';
import {Db2DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrderRepository} from './order.repository';

export class TableRepository extends DefaultCrudRepository<
  Table,
  typeof Table.prototype.tableID,
  TableRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Table.prototype.tableID>;

  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Table, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
