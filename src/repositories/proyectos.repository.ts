import {DefaultCrudRepository} from '@loopback/repository';
import {Proyectos, ProyectosRelations} from '../models';
import {MongoconDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProyectosRepository extends DefaultCrudRepository<
  Proyectos,
  typeof Proyectos.prototype.id,
  ProyectosRelations
> {
  constructor(
    @inject('datasources.mongocon') dataSource: MongoconDataSource,
  ) {
    super(Proyectos, dataSource);
  }
}
