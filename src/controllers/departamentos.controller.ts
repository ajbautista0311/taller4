import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import {Departamentos} from '../models';
import {DepartamentosRepository} from '../repositories';

export class DepartamentosController {
  constructor(
    @repository(DepartamentosRepository)
    public departamentosRepository : DepartamentosRepository,
  ) {}

  @post('/departamentos', {
    responses: {
      '200': {
        description: 'Departamentos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departamentos)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamentos, {
            title: 'NewDepartamentos',
            exclude: ['id'],
          }),
        },
      },
    })
    departamentos: Omit<Departamentos, 'id'>,
  ): Promise<Departamentos> {
    return this.departamentosRepository.create(departamentos);
  }

  @get('/departamentos/count', {
    responses: {
      '200': {
        description: 'Departamentos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Departamentos)) where?: Where<Departamentos>,
  ): Promise<Count> {
    return this.departamentosRepository.count(where);
  }

  @get('/departamentos', {
    responses: {
      '200': {
        description: 'Array of Departamentos model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamentos)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Departamentos)) filter?: Filter<Departamentos>,
  ): Promise<Departamentos[]> {
    return this.departamentosRepository.find(filter,{ strictObjectIDCoercion: true });
  }

  @patch('/departamentos', {
    responses: {
      '200': {
        description: 'Departamentos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamentos, {partial: true}),
        },
      },
    })
    departamentos: Departamentos,
    @param.query.object('where', getWhereSchemaFor(Departamentos)) where?: Where<Departamentos>,
  ): Promise<Count> {
    return this.departamentosRepository.updateAll(departamentos, where);
  }

  @get('/departamentos/{id}', {
    responses: {
      '200': {
        description: 'Departamentos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departamentos)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Departamentos> {
    return this.departamentosRepository.findById(id);
  }

  @patch('/departamentos/{id}', {
    responses: {
      '204': {
        description: 'Departamentos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamentos, {partial: true}),
        },
      },
    })
    departamentos: Departamentos,
  ): Promise<void> {
    await this.departamentosRepository.updateById(id, departamentos);
  }

  @put('/departamentos/{id}', {
    responses: {
      '204': {
        description: 'Departamentos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() departamentos: Departamentos,
  ): Promise<void> {
    await this.departamentosRepository.replaceById(id, departamentos);
  }

  @del('/departamentos/{id}', {
    responses: {
      '204': {
        description: 'Departamentos DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.departamentosRepository.deleteById(id);
  }
  // Propios
  // actualizar estado
  @patch('/updatestatusdep/{id}', {
    responses: {
      '204': {
        description: 'Departamentos PATCH success',
      },
    },
  })
  async updatestatus(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamentos, {partial: true}),
        },
      },
    })
    departamentos: Departamentos,
  ): Promise<void> {
    var verificador = await this.departamentosRepository.findOne({ where: { id: id }, });
    if(verificador){
      departamentos.id = verificador.id;
      departamentos.name = verificador.name;
      departamentos.fecha_creacion = verificador.fecha_creacion;
      departamentos.code = verificador.code;
      departamentos.description = verificador.description;
      let now = new Date();
      departamentos.fecha_actualizacion = now.toString();
      if(verificador.enable){
        departamentos.enable = false;
      }else{
        departamentos.enable = true;
      }
      await this.departamentosRepository.updateById(id, departamentos);
    }else{
      throw new HttpErrors.BadRequest(`No se encontro el Proyecto`);
    }
  }

  // actualizar departamento
  @patch('/updatedep/{id}', {
    responses: {
      '204': {
        description: 'Departamentos PATCH success',
      },
    },
  })
  async updatedep(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamentos, {partial: true}),
        },
      },
    })
    departamentos: Departamentos,
  ): Promise<void> {
    var verificador = await this.departamentosRepository.findOne({ where: { id: id }, });
    if(verificador){
      departamentos.id = verificador.id;
      departamentos.fecha_creacion = verificador.fecha_creacion;
      let now = new Date();
      departamentos.fecha_actualizacion = now.toString();
      departamentos.enable = verificador.enable;
      await this.departamentosRepository.updateById(id, departamentos);
    }else{
      throw new HttpErrors.BadRequest(`No se encontro el Proyecto`);
    }
  }
}
