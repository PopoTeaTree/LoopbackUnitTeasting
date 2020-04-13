import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Bill, BillRelations, Order} from '../models';
import {Db2DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrderRepository} from './order.repository';

export class BillRepository extends DefaultCrudRepository<
  Bill,
  typeof Bill.prototype.billID,
  BillRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Bill.prototype.billID>;

  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Bill, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
