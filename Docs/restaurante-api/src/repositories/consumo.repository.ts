import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Consumo, ConsumoRelations, Reserva} from '../models';
import {ReservaRepository} from './reserva.repository';

export class ConsumoRepository extends DefaultCrudRepository<
  Consumo,
  typeof Consumo.prototype.id,
  ConsumoRelations
> {

  public readonly reserva: BelongsToAccessor<Reserva, typeof Consumo.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>,
  ) {
    super(Consumo, dataSource);
    this.reserva = this.createBelongsToAccessorFor('reserva', reservaRepositoryGetter,);
    this.registerInclusionResolver('reserva', this.reserva.inclusionResolver);
  }
}
