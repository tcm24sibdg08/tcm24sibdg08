import {Entity, model, property} from '@loopback/repository';

@model()
export class MenuItem extends Entity {
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
  nome: string;

  @property({
    type: 'string',
  })
  descricao?: string;

 @property({
  type: 'string',
  required: true,
  jsonSchema: {
    enum: ['Entrada', 'Prato', 'Bebida', 'Sobremesa'],
  },
})
tipoItem: string;

@property({
  type: 'string',
  required: true,
  jsonSchema: {
    enum: ['Normal', 'Aniversário'],
  },
})
tipoMenu: string;

  @property({
    type: 'number',
    required: true,
  })
  precoUnidade: number;


  constructor(data?: Partial<MenuItem>) {
    super(data);
  }
}

export interface MenuItemRelations {
  // describe navigational properties here
}

export type MenuItemWithRelations = MenuItem & MenuItemRelations;
