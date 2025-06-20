import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Reserva, ReservaRelations, Cliente, Mesa} from '../models';
import {ClienteRepository} from './cliente.repository';
import {MesaRepository} from './mesa.repository';

export class ReservaRepository extends DefaultCrudRepository<
  Reserva,
  typeof Reserva.prototype.id,
  ReservaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Reserva.prototype.id>;

  public readonly mesa: BelongsToAccessor<Mesa, typeof Reserva.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('MesaRepository') protected mesaRepositoryGetter: Getter<MesaRepository>,
  ) {
    super(Reserva, dataSource);
    this.mesa = this.createBelongsToAccessorFor('mesa', mesaRepositoryGetter,);
    this.registerInclusionResolver('mesa', this.mesa.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
