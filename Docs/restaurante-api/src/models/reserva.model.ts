import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Mesa} from './mesa.model';

@model()
export class Reserva extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'string',
    required: true,
  })
  nomeCliente: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'date-time',
    },
  })
  dataHoraReserva: string;

  @property({
    type: 'number',
    required: true,
  })
  numeroPessoas: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['Normal', 'Aniversário'],
    },
  })
  tipoMenu: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'date-time',
    },
  })
  dataCriacao: string;

  @belongsTo(() => Cliente)
  clienteId: number;

  @belongsTo(() => Mesa)
  mesaId: number;

  constructor(data?: Partial<Reserva>) {
    super(data);
  }
}

export interface ReservaRelations {
  // describe navigational properties here
}

export type ReservaWithRelations = Reserva & ReservaRelations;
