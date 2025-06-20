import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Restaurante, RestauranteRelations} from '../models';

export class RestauranteRepository extends DefaultCrudRepository<
  Restaurante,
  typeof Restaurante.prototype.id,
  RestauranteRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Restaurante, dataSource);
  }
}
