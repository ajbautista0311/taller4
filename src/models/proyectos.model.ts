import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import { Empresa } from '.';
import { Departamentos } from './departamentos.model';
import { Responsable } from './responsable.model';

@model({settings: {strict: false}})
export class Proyectos extends Empresa {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  // Relaciones
  /*
  @hasOne(() => Departamentos)
  departamentos?: Departamentos;

  @hasOne(() => Responsable)
  responsables?: Responsable;
  */
  @belongsTo(() => Responsable)
    responsableId: string;
  @belongsTo(() => Departamentos)
    departamentosId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Proyectos>) {
    super(data);
  }
}

export interface ProyectosRelations {
  // describe navigational properties here
}

export type ProyectosWithRelations = Proyectos & ProyectosRelations;
