import {DefaultCrudRepository} from '@loopback/repository';
import {Responsable, ResponsableRelations} from '../models';
import {MongoconDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ResponsableRepository extends DefaultCrudRepository<
  Responsable,
  typeof Responsable.prototype.id,
  ResponsableRelations
> {
  constructor(
    @inject('datasources.mongocon') dataSource: MongoconDataSource,
  ) {
    super(Responsable, dataSource);
  }
}
