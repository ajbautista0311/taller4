import {DefaultCrudRepository} from '@loopback/repository';
import {Empresa, EmpresaRelations} from '../models';
import {MongoconDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.id,
  EmpresaRelations
> {
  constructor(
    @inject('datasources.mongocon') dataSource: MongoconDataSource,
  ) {
    super(Empresa, dataSource);
  }
}
