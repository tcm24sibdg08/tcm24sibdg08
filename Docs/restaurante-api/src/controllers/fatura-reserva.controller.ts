import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Fatura,
  Reserva,
} from '../models';
import {FaturaRepository} from '../repositories';

export class FaturaReservaController {
  constructor(
    @repository(FaturaRepository)
    public faturaRepository: FaturaRepository,
  ) { }

  @get('/faturas/{id}/reserva', {
    responses: {
      '200': {
        description: 'Reserva belonging to Fatura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Reserva),
          },
        },
      },
    },
  })
  async getReserva(
    @param.path.number('id') id: typeof Fatura.prototype.id,
  ): Promise<Reserva> {
    return this.faturaRepository.reserva(id);
  }
}
