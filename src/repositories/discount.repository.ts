import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Discount, DiscountRelations, Menu} from '../models';
import {Db2DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MenuRepository} from './menu.repository';

export class DiscountRepository extends DefaultCrudRepository<
  Discount,
  typeof Discount.prototype.disID,
  DiscountRelations
> {

  public readonly menus: HasManyRepositoryFactory<Menu, typeof Discount.prototype.disID>;

  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource, @repository.getter('MenuRepository') protected menuRepositoryGetter: Getter<MenuRepository>,
  ) {
    super(Discount, dataSource);
    this.menus = this.createHasManyRepositoryFactoryFor('menus', menuRepositoryGetter,);
    this.registerInclusionResolver('menus', this.menus.inclusionResolver);
  }
}
