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
import { Proyectos } from '../models';
import { ProyectosRepository } from '../repositories';
import { DepartamentosRepository } from '../repositories/departamentos.repository';
import { ResponsableRepository } from '../repositories/responsable.repository';

export class ProyectosController {
  constructor(
    @repository(ProyectosRepository)
    public proyectosRepository: ProyectosRepository,
    @repository(DepartamentosRepository)
    public departamentosRepository: DepartamentosRepository,
    @repository(ResponsableRepository)
    public responsableRepository: ResponsableRepository,
  ) { }

  @post('/proyectos', {
    responses: {
      '200': {
        description: 'Proyectos model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Proyectos) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {
            title: 'NewProyectos',
            exclude: ['id'],
          }),
        },
      },
    })
    proyectos: Omit<Proyectos, 'id'>,
  ): Promise<Proyectos> {
    return this.proyectosRepository.create(proyectos);
  }

  @get('/proyectos/count', {
    responses: {
      '200': {
        description: 'Proyectos model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Proyectos)) where?: Where<Proyectos>,
  ): Promise<Count> {
    return this.proyectosRepository.count(where);
  }

  @get('/proyectos', {
    responses: {
      '200': {
        description: 'Array of Proyectos model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Proyectos) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Proyectos)) filter?: Filter<Proyectos>,
  ): Promise<Proyectos[]> {
    return this.proyectosRepository.find(filter, { strictObjectIDCoercion: true });
  }

  @patch('/proyectos', {
    responses: {
      '200': {
        description: 'Proyectos PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, { partial: true }),
        },
      },
    })
    proyectos: Proyectos,
    @param.query.object('where', getWhereSchemaFor(Proyectos)) where?: Where<Proyectos>,
  ): Promise<Count> {
    return this.proyectosRepository.updateAll(proyectos, where);
  }

  @get('/proyectos/{id}', {
    responses: {
      '200': {
        description: 'Proyectos model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Proyectos) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Proyectos> {
    return this.proyectosRepository.findById(id);
  }

  @patch('/proyectos/{id}', {
    responses: {
      '204': {
        description: 'Proyectos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, { partial: true }),
        },
      },
    })
    proyectos: Proyectos,
  ): Promise<void> {
    await this.proyectosRepository.updateById(id, proyectos);
  }

  @put('/proyectos/{id}', {
    responses: {
      '204': {
        description: 'Proyectos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() proyectos: Proyectos,
  ): Promise<void> {
    await this.proyectosRepository.replaceById(id, proyectos);
  }

  // Propios
  // crear proyecto
  @post('/createpro', {
    responses: {
      '200': {
        description: 'Proyectos model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Proyectos) } },
      },
    },
  })
  async createpro(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {
            title: 'NewProyectos',
            exclude: ['id'],
          }),
        },
      },
    })
    proyectos: Omit<Proyectos, 'id'>,
  ): Promise<Proyectos> {
    
    var existedep, existeres;
    var verificadordep = await this.departamentosRepository.findOne({ where: { id: proyectos.departamentosId }, });
    var verificadorres = await this.responsableRepository.findOne({ where: { id: proyectos.responsableId }, });

    if (verificadordep) {
      if (verificadordep.enable) {
        existedep = true;
      } else {
        throw new HttpErrors.BadRequest(`Departamento Inactivo`);
      }
    } else {
      throw new HttpErrors.BadRequest(`No se encontro el Departamento`);
    }

    if (verificadorres) {
      if (verificadorres.enable) {
        existeres = 1;
      } else {
        throw new HttpErrors.BadRequest(`Responsable Inactivo`);
      }
    } else {
      throw new HttpErrors.BadRequest(`No se encontro el Responsable`);
    }

    if (existeres && existedep) {
      let now = new Date();
      proyectos.fecha_creacion = now;
      proyectos.fecha_actualizacion = now;
      proyectos.enable = true;
      return this.proyectosRepository.create(proyectos);
    } else {
      throw new HttpErrors.BadRequest(`Error interno`);
    }
    return this.proyectosRepository.create(proyectos);
  }
  // actualizar proyecto
  @patch('/updatepro/{id}', {
    responses: {
      '204': {
        description: 'Proyectos PATCH success',
      },
    },
  })
  async updatepro(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, { partial: true }),
        },
      },
    })
    proyectos: Proyectos,
  ): Promise<void> {

    var existedep, existeres;
    var verificador = await this.proyectosRepository.findOne({ where: { id: proyectos.id }, });
    var verificadordep = await this.departamentosRepository.findOne({ where: { id: proyectos.departamentosId }, });
    var verificadorres = await this.responsableRepository.findOne({ where: { id: proyectos.responsableId }, });

    if(verificador){
      let now = new Date();
      proyectos.fecha_actualizacion = now.toString();
      proyectos.fecha_creacion = verificador.fecha_creacion;
      proyectos.enable = verificador.enable;
      if (verificadordep) {
        if (verificadordep.enable) {
          existedep = true;
        } else {
          throw new HttpErrors.BadRequest(`Departamento Inactivo`);
        }
      } else {
        throw new HttpErrors.BadRequest(`No se encontro el Departamento`);
      }

      if (verificadorres) {
        if (verificadorres.enable) {
          existeres = 1;
        } else {
          throw new HttpErrors.BadRequest(`Responsable Inactivo`);
        }
      } else {
        throw new HttpErrors.BadRequest(`No se encontro el Responsable`);
      }

      if (existeres && existedep) {
        await this.proyectosRepository.updateById(id, proyectos);
      }else{
        throw new HttpErrors.BadRequest(`Error Interno`);
      }
    }else{
      throw new HttpErrors.BadRequest(`No se encontro el Proyecto`);
    }
  }
  // actualizar estatus -> enable true o false
  @patch('/updatestatuspro/{id}', {
    responses: {
      '204': {
        description: 'Proyectos PATCH success',
      },
    },
  })
  async updatestatus(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, { partial: true }),
        },
      },
    })
    proyectos: Proyectos,
  ): Promise<void> {
    var verificador = await this.proyectosRepository.findOne({ where: { id: id }, });
    if(verificador){
      let now = new Date();
      proyectos.fecha_actualizacion = now.toString();
      proyectos.fecha_creacion = verificador.fecha_creacion;
      proyectos.name = verificador.name;
      proyectos.responsableId = verificador.responsableId;
      proyectos.departamentosId = verificador.departamentosId;
      proyectos.code = verificador.code;
      proyectos.id = verificador.id;
      proyectos.description = verificador.description;
        if(verificador.enable){
          proyectos.enable = false;
        }else{
          proyectos.enable = true;
        }
      await this.proyectosRepository.updateById(id, proyectos);
    }else{
      throw new HttpErrors.BadRequest(`No se encontro el Proyecto`);
    }
  }
  // borrar proyecto
  @del('/deletepro/{id}', {
    responses: {
      '204': {
        description: 'Proyectos DELETE success',
      },
    },
  })
  async deletepro(@param.path.string('id') id: string): Promise<void> {
    await this.proyectosRepository.deleteById(id);
  }
}
