import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Mesa, MesaRelations, Restaurante} from '../models';
import {RestauranteRepository} from './restaurante.repository';

export class MesaRepository extends DefaultCrudRepository<
  Mesa,
  typeof Mesa.prototype.id,
  MesaRelations
> {

  public readonly restaurante: BelongsToAccessor<Restaurante, typeof Mesa.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('RestauranteRepository') protected restauranteRepositoryGetter: Getter<RestauranteRepository>,
  ) {
    super(Mesa, dataSource);
    this.restaurante = this.createBelongsToAccessorFor('restaurante', restauranteRepositoryGetter,);
    this.registerInclusionResolver('restaurante', this.restaurante.inclusionResolver);
  }
}
