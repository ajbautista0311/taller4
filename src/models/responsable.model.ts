import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import { Proyectos } from './proyectos.model';

@model({settings: {strict: false}})
export class Responsable extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'boolean',
    required: true,
  })
  enable: boolean;
  
  //@belongsTo(() => Proyectos)
  //proyectosId: string;

  @hasOne(() => Proyectos)
  proyectos?: Proyectos;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Responsable>) {
    super(data);
  }
}

export interface ResponsableRelations {
  // describe navigational properties here
}

export type ResponsableWithRelations = Responsable & ResponsableRelations;
