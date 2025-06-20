import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Reserva} from './reserva.model';

@model()
export class Consumo extends Entity {
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
  nomeItem: string;

  @property({
    type: 'number',
    required: true,
  })
  quantidade: number;

  @belongsTo(() => Reserva)
  reservaId: number;

  constructor(data?: Partial<Consumo>) {
    super(data);
  }
}

export interface ConsumoRelations {
  // describe navigational properties here
}

export type ConsumoWithRelations = Consumo & ConsumoRelations;
