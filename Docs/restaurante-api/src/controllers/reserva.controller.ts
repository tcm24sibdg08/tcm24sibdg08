import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Reserva} from '../models';
import {MesaRepository, ReservaRepository} from '../repositories';

export class ReservaController {
  constructor(
    @repository(ReservaRepository)
    public reservaRepository: ReservaRepository,

    @repository(MesaRepository)
    public mesaRepository: MesaRepository,
  ) {}

  @post('/reservas')
  @response(200, {
    description: 'Reserva model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reserva)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {
            title: 'NewReserva',
            exclude: ['id'],
          }),
        },
      },
    })
    reserva: Omit<Reserva, 'id'>,
  ): Promise<Reserva> {
    // 🔄 Corrigir formato das datas (ISO para MySQL)
    reserva.dataHoraReserva = reserva.dataHoraReserva
      .replace('Z', '')
      .replace('T', ' ');
    reserva.dataCriacao = reserva.dataCriacao
      .replace('Z', '')
      .replace('T', ' ');

    const mesa = await this.mesaRepository.findById(reserva.mesaId);

    if (reserva.numeroPessoas > mesa.capacidade) {
      throw new HttpErrors.BadRequest(
        'Grupo demasiado grande para esta mesa. Contacte o restaurante.',
      );
    }

    const conflitos = await this.reservaRepository.find({
      where: {
        mesaId: reserva.mesaId,
        dataHoraReserva: reserva.dataHoraReserva,
      },
    });

    if (conflitos.length > 0) {
      throw new HttpErrors.Conflict(
        'Já existe uma reserva para esta mesa nesse horário.',
      );
    }

    await this.mesaRepository.updateById(reserva.mesaId, {estado: 'Pendente'});

    return this.reservaRepository.create(reserva);
  }

  @get('/reservas/count')
  @response(200, {
    description: 'Reserva model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Reserva) where?: Where<Reserva>): Promise<Count> {
    return this.reservaRepository.count(where);
  }

  @get('/reservas')
  @response(200, {
    description: 'Array of Reserva model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reserva, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Reserva) filter?: Filter<Reserva>): Promise<Reserva[]> {
    return this.reservaRepository.find(filter);
  }

  @patch('/reservas')
  @response(200, {
    description: 'Reserva PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {partial: true}),
        },
      },
    })
    reserva: Reserva,
    @param.where(Reserva) where?: Where<Reserva>,
  ): Promise<Count> {
    return this.reservaRepository.updateAll(reserva, where);
  }

  @get('/reservas/{id}')
  @response(200, {
    description: 'Reserva model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reserva, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Reserva, {exclude: 'where'}) filter?: FilterExcludingWhere<Reserva>,
  ): Promise<Reserva> {
    return this.reservaRepository.findById(id, filter);
  }

  @patch('/reservas/{id}')
  @response(204, {
    description: 'Reserva PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reserva, {partial: true}),
        },
      },
    })
    reserva: Reserva,
  ): Promise<void> {
    await this.reservaRepository.updateById(id, reserva);
  }

  @put('/reservas/{id}')
  @response(204, {
    description: 'Reserva PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() reserva: Reserva,
  ): Promise<void> {
    await this.reservaRepository.replaceById(id, reserva);
  }

  @del('/reservas/{id}')
  @response(204, {
    description: 'Reserva DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.reservaRepository.deleteById(id);
  }
}
