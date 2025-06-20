import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Reserva,
  Mesa,
} from '../models';
import {ReservaRepository} from '../repositories';

export class ReservaMesaController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository: ReservaRepository,
  ) { }

  @get('/reservas/{id}/mesa', {
    responses: {
      '200': {
        description: 'Mesa belonging to Reserva',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Mesa),
          },
        },
      },
    },
  })
  async getMesa(
    @param.path.number('id') id: typeof Reserva.prototype.id,
  ): Promise<Mesa> {
    return this.reservaRepository.mesa(id);
  }
}
