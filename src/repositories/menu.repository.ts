import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Menu, MenuRelations, Order} from '../models';
import {Db2DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrderRepository} from './order.repository';

export class MenuRepository extends DefaultCrudRepository<
  Menu,
  typeof Menu.prototype.menuID,
  MenuRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Menu.prototype.menuID>;

  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Menu, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
