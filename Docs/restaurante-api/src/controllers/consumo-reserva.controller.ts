import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Consumo,
  Reserva,
} from '../models';
import {ConsumoRepository} from '../repositories';

export class ConsumoReservaController {
  constructor(
    @repository(ConsumoRepository)
    public consumoRepository: ConsumoRepository,
  ) { }

  @get('/consumos/{id}/reserva', {
    responses: {
      '200': {
        description: 'Reserva belonging to Consumo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Reserva),
          },
        },
      },
    },
  })
  async getReserva(
    @param.path.number('id') id: typeof Consumo.prototype.id,
  ): Promise<Reserva> {
    return this.consumoRepository.reserva(id);
  }
}
