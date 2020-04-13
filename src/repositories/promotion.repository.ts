import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Promotion, PromotionRelations, Bill} from '../models';
import {Db2DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BillRepository} from './bill.repository';

export class PromotionRepository extends DefaultCrudRepository<
  Promotion,
  typeof Promotion.prototype.proID,
  PromotionRelations
> {

  public readonly bills: HasManyRepositoryFactory<Bill, typeof Promotion.prototype.proID>;

  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource, @repository.getter('BillRepository') protected billRepositoryGetter: Getter<BillRepository>,
  ) {
    super(Promotion, dataSource);
    this.bills = this.createHasManyRepositoryFactoryFor('bills', billRepositoryGetter,);
    this.registerInclusionResolver('bills', this.bills.inclusionResolver);
  }
}
