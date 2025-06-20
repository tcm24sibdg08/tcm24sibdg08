import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Consumo} from '../models';
import {ConsumoRepository} from '../repositories';

export class ConsumoController {
  constructor(
    @repository(ConsumoRepository)
    public consumoRepository : ConsumoRepository,
  ) {}

  @post('/consumos')
  @response(200, {
    description: 'Consumo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Consumo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consumo, {
            title: 'NewConsumo',
            exclude: ['id'],
          }),
        },
      },
    })
    consumo: Omit<Consumo, 'id'>,
  ): Promise<Consumo> {
    return this.consumoRepository.create(consumo);
  }

  @get('/consumos/count')
  @response(200, {
    description: 'Consumo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Consumo) where?: Where<Consumo>,
  ): Promise<Count> {
    return this.consumoRepository.count(where);
  }

  @get('/consumos')
  @response(200, {
    description: 'Array of Consumo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Consumo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Consumo) filter?: Filter<Consumo>,
  ): Promise<Consumo[]> {
    return this.consumoRepository.find(filter);
  }

  @patch('/consumos')
  @response(200, {
    description: 'Consumo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consumo, {partial: true}),
        },
      },
    })
    consumo: Consumo,
    @param.where(Consumo) where?: Where<Consumo>,
  ): Promise<Count> {
    return this.consumoRepository.updateAll(consumo, where);
  }

  @get('/consumos/{id}')
  @response(200, {
    description: 'Consumo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Consumo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Consumo, {exclude: 'where'}) filter?: FilterExcludingWhere<Consumo>
  ): Promise<Consumo> {
    return this.consumoRepository.findById(id, filter);
  }

  @patch('/consumos/{id}')
  @response(204, {
    description: 'Consumo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consumo, {partial: true}),
        },
      },
    })
    consumo: Consumo,
  ): Promise<void> {
    await this.consumoRepository.updateById(id, consumo);
  }

  @put('/consumos/{id}')
  @response(204, {
    description: 'Consumo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() consumo: Consumo,
  ): Promise<void> {
    await this.consumoRepository.replaceById(id, consumo);
  }

  @del('/consumos/{id}')
  @response(204, {
    description: 'Consumo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.consumoRepository.deleteById(id);
  }
}
