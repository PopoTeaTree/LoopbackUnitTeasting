import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Staff, StaffRelations, Order, Bill, Role} from '../models';
import {Db2DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrderRepository} from './order.repository';
import {BillRepository} from './bill.repository';
import {RoleRepository} from './role.repository';

export class StaffRepository extends DefaultCrudRepository<
  Staff,
  typeof Staff.prototype.staffID,
  StaffRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Staff.prototype.staffID>;

  public readonly bills: HasManyRepositoryFactory<Bill, typeof Staff.prototype.staffID>;

  public readonly roles: HasManyRepositoryFactory<Role, typeof Staff.prototype.staffID>;

  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>, @repository.getter('BillRepository') protected billRepositoryGetter: Getter<BillRepository>, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(Staff, dataSource);
    this.roles = this.createHasManyRepositoryFactoryFor('roles', roleRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.bills = this.createHasManyRepositoryFactoryFor('bills', billRepositoryGetter,);
    this.registerInclusionResolver('bills', this.bills.inclusionResolver);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
