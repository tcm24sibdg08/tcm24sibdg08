import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Reserva} from './reserva.model';

@model()
export class Fatura extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'date-time',
    },
  })
  dataHora: string;

  @property({
    type: 'string',
  })
  pedidosResumo?: string;

  @property({
    type: 'number',
    required: true,
  })
  subtotal: number;

  @property({
    type: 'number',
    required: true,
  })
  iva: number;

  @property({
    type: 'number',
    required: true,
  })
  totalFinal: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['Pendente', 'Pago'],
    },
  })
  estPagamento: string;

  @belongsTo(() => Reserva)
  reservaId: number;

  constructor(data?: Partial<Fatura>) {
    super(data);
  }
}

export interface FaturaRelations {
  // describe navigational properties here
}

export type FaturaWithRelations = Fatura & FaturaRelations;
