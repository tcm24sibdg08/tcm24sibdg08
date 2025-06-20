import {Entity, model, property} from '@loopback/repository';

@model()
export class Restaurante extends Entity {
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
  cidade: string;

  @property({
    type: 'string',
    required: true,
  })
  rua: string;

  @property({
    type: 'string',
    required: true,
  })
  numero: string;

  @property({
    type: 'string',
    required: true,
  })
  codigoPostal: string;


  constructor(data?: Partial<Restaurante>) {
    super(data);
  }
}

export interface RestauranteRelations {
  // describe navigational properties here
}

export type RestauranteWithRelations = Restaurante & RestauranteRelations;
