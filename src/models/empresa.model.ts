import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Empresa extends Entity {


  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
  })
  fecha_creacion: string;

  @property({
    type: 'string',
  })
  fecha_actualizacion: string;

  @property({
    type: 'boolean',
    required: true,
  })
  enable: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Empresa>) {
    super(data);
  }
}

export interface EmpresaRelations {
  // describe navigational properties here
}

export type EmpresaWithRelations = Empresa & EmpresaRelations;
