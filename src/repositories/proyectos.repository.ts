import {DefaultCrudRepository, BelongsToAccessor, repository} from '@loopback/repository';
import {Proyectos, ProyectosRelations} from '../models';
import {MongoconDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import { Departamentos } from '../models/departamentos.model';
import { Responsable } from '../models/responsable.model';
import { DepartamentosRepository } from './departamentos.repository';
import { ResponsableRepository } from './responsable.repository';

export class ProyectosRepository extends DefaultCrudRepository<
  Proyectos,
  typeof Proyectos.prototype.id,
  ProyectosRelations
> {
  public readonly departamentos: BelongsToAccessor<Departamentos, typeof Proyectos.prototype.id>;
  public readonly responsable: BelongsToAccessor<Responsable, typeof Proyectos.prototype.id>;

  constructor(

    @inject('datasources.mongocon') dataSource: MongoconDataSource,
    @repository.getter('DepartamentosRepository') protected departamentosRepositoryGetter: Getter<DepartamentosRepository>,
    @repository.getter('ResponsableRepository') protected responsableRepositoryGetter: Getter<ResponsableRepository>,

  ) {
    super(Proyectos, dataSource);
    this.departamentos = this.createBelongsToAccessorFor('departamentos', departamentosRepositoryGetter,);
    this.responsable = this.createBelongsToAccessorFor('responsable', responsableRepositoryGetter,);
    this.registerInclusionResolver("departamentos", this.departamentos.inclusionResolver);
    this.registerInclusionResolver("responsable", this.responsable.inclusionResolver);
  }
}
