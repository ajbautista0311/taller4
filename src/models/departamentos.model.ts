import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import { Empresa } from '.';
import { Proyectos } from './proyectos.model';

@model({settings: {strict: false}})
export class Departamentos extends Empresa {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  //@belongsTo(() => Proyectos)
  //proyectosId: string;

  @hasOne(() => Proyectos)
  proyectos?: Proyectos;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Departamentos>) {
    super(data);
  }
}

export interface DepartamentosRelations {
  // describe navigational properties here
}

export type DepartamentosWithRelations = Departamentos & DepartamentosRelations;
