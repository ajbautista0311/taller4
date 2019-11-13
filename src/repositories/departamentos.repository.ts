import {DefaultCrudRepository} from '@loopback/repository';
import {Departamentos, DepartamentosRelations} from '../models';
import {MongoconDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DepartamentosRepository extends DefaultCrudRepository<
  Departamentos,
  typeof Departamentos.prototype.id,
  DepartamentosRelations
> {
  constructor(
    @inject('datasources.mongocon') dataSource: MongoconDataSource,
  ) {
    super(Departamentos, dataSource);
  }
}
