import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mesa,
  Restaurante,
} from '../models';
import {MesaRepository} from '../repositories';

export class MesaRestauranteController {
  constructor(
    @repository(MesaRepository)
    public mesaRepository: MesaRepository,
  ) { }

  @get('/mesas/{id}/restaurante', {
    responses: {
      '200': {
        description: 'Restaurante belonging to Mesa',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Restaurante),
          },
        },
      },
    },
  })
  async getRestaurante(
    @param.path.number('id') id: typeof Mesa.prototype.id,
  ): Promise<Restaurante> {
    return this.mesaRepository.restaurante(id);
  }
}
