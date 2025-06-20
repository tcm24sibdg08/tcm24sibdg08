import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Fatura, FaturaRelations, Reserva} from '../models';
import {ReservaRepository} from './reserva.repository';

export class FaturaRepository extends DefaultCrudRepository<
  Fatura,
  typeof Fatura.prototype.id,
  FaturaRelations
> {

  public readonly reserva: BelongsToAccessor<Reserva, typeof Fatura.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>,
  ) {
    super(Fatura, dataSource);
    this.reserva = this.createBelongsToAccessorFor('reserva', reservaRepositoryGetter,);
    this.registerInclusionResolver('reserva', this.reserva.inclusionResolver);
  }
}
