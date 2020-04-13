import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Membership, MembershipRelations, Bill, Role} from '../models';
import {Db2DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BillRepository} from './bill.repository';
import {RoleRepository} from './role.repository';

export class MembershipRepository extends DefaultCrudRepository<
  Membership,
  typeof Membership.prototype.memID,
  MembershipRelations
> {

  public readonly bills: HasManyRepositoryFactory<Bill, typeof Membership.prototype.memID>;

  public readonly roles: HasManyRepositoryFactory<Role, typeof Membership.prototype.memID>;

  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource, @repository.getter('BillRepository') protected billRepositoryGetter: Getter<BillRepository>, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(Membership, dataSource);
    this.roles = this.createHasManyRepositoryFactoryFor('roles', roleRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.bills = this.createHasManyRepositoryFactoryFor('bills', billRepositoryGetter,);
    this.registerInclusionResolver('bills', this.bills.inclusionResolver);
  }
}
