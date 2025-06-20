import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Restaurante} from './restaurante.model';

@model()
export class Mesa extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'number',
    required: true,
  })
  numeroMesa: number;

  @property({
    type: 'number',
    required: true,
  })
  capacidade: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['Disponível', 'Pendente', 'Reservada'],
    },
  })
  estado: string;

  @belongsTo(() => Restaurante)
  restauranteId: number;

  constructor(data?: Partial<Mesa>) {
    super(data);
  }
}

export interface MesaRelations {
  // describe navigational properties here
}

export type MesaWithRelations = Mesa & MesaRelations;
