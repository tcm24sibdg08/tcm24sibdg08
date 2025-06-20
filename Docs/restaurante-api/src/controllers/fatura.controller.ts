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
import {Fatura} from '../models';
import {
  ConsumoRepository,
  FaturaRepository,
  MenuItemRepository,
  MesaRepository,
  ReservaRepository,
} from '../repositories';

export class FaturaController {
  constructor(
    @repository(FaturaRepository)
    public faturaRepository: FaturaRepository,
    @repository(ConsumoRepository)
    public consumoRepository: ConsumoRepository,
    @repository(ReservaRepository)
    public reservaRepository: ReservaRepository,
    @repository(MenuItemRepository)
    public menuItemRepository: MenuItemRepository,
    @repository(MesaRepository)
    public mesaRepository: MesaRepository,
  ) {}

  @post('/faturas')
  @response(200, {
    description: 'Fatura model instance',
    content: {'application/json': {schema: getModelSchemaRef(Fatura)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fatura, {
            title: 'NewFatura',
            exclude: ['id'],
          }),
        },
      },
    })
    fatura: Omit<Fatura, 'id'>,
  ): Promise<Fatura> {
    return this.faturaRepository.create(fatura);
  }

  @post('/reservas/{id}/gerar-fatura')
  @response(200, {
    description: 'Gera fatura automaticamente para uma reserva',
  })
  async gerarFatura(@param.path.number('id') id: number): Promise<Fatura> {
    const reserva = await this.reservaRepository.findById(id);
    const mesa = await this.mesaRepository.findById(reserva.mesaId);

    const consumos = await this.consumoRepository.find({where: {reservaId: id}});
    if (consumos.length === 0) {
      throw new HttpErrors.BadRequest('Não há consumos associados a esta reserva.');
    }

    let subtotal = 0;
    let resumo = [];

    for (const consumo of consumos) {
      const item = await this.menuItemRepository.findOne({
        where: {nome: consumo.nomeItem},
      });

      if (!item) {
        throw new HttpErrors.NotFound(`Item '${consumo.nomeItem}' não encontrado no menu.`);
      }

      const totalLinha = item.precoUnidade * consumo.quantidade;
      subtotal += totalLinha;
      resumo.push(`${consumo.quantidade}x ${consumo.nomeItem}`);
    }

    const iva = +(subtotal * 0.2).toFixed(2); // 20% IVA
    const totalFinal = +(subtotal + iva).toFixed(2);
    const pedidosResumo = resumo.join(', ');

const novaFatura = await this.faturaRepository.create({
  reservaId: id,
  pedidosResumo,
  subtotal,
  iva,
  totalFinal,
  estPagamento: 'Pendente',
  dataHora: new Date().toISOString().slice(0, 19).replace('T', ' '),
});

    await this.mesaRepository.updateById(mesa.id, {estado: 'Disponível'});

    return novaFatura;
  }

  @get('/faturas/count')
  @response(200, {
    description: 'Fatura model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Fatura) where?: Where<Fatura>): Promise<Count> {
    return this.faturaRepository.count(where);
  }

  @get('/faturas')
  @response(200, {
    description: 'Array of Fatura model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Fatura, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Fatura) filter?: Filter<Fatura>): Promise<Fatura[]> {
    return this.faturaRepository.find(filter);
  }

  @get('/faturas/{id}')
  @response(200, {
    description: 'Fatura model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Fatura, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Fatura, {exclude: 'where'}) filter?: FilterExcludingWhere<Fatura>,
  ): Promise<Fatura> {
    return this.faturaRepository.findById(id, filter);
  }

  @patch('/faturas')
  @response(200, {
    description: 'Fatura PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fatura, {partial: true}),
        },
      },
    })
    fatura: Fatura,
    @param.where(Fatura) where?: Where<Fatura>,
  ): Promise<Count> {
    return this.faturaRepository.updateAll(fatura, where);
  }

  @patch('/faturas/{id}')
  @response(204, {
    description: 'Fatura PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fatura, {partial: true}),
        },
      },
    })
    fatura: Fatura,
  ): Promise<void> {
    await this.faturaRepository.updateById(id, fatura);
  }

  @put('/faturas/{id}')
  @response(204, {
    description: 'Fatura PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() fatura: Fatura,
  ): Promise<void> {
    await this.faturaRepository.replaceById(id, fatura);
  }

  @del('/faturas/{id}')
  @response(204, {
    description: 'Fatura DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.faturaRepository.deleteById(id);
  }
}
