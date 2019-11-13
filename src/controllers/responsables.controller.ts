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
import {Responsable} from '../models';
import {ResponsableRepository} from '../repositories';

export class ResponsablesController {
  constructor(
    @repository(ResponsableRepository)
    public responsableRepository : ResponsableRepository,
  ) {}

  @post('/responsables', {
    responses: {
      '200': {
        description: 'Responsable model instance',
        content: {'application/json': {schema: getModelSchemaRef(Responsable)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Responsable, {
            title: 'NewResponsable',
            exclude: ['id'],
          }),
        },
      },
    })
    responsable: Omit<Responsable, 'id'>,
  ): Promise<Responsable> {
    return this.responsableRepository.create(responsable);
  }

  @get('/responsables/count', {
    responses: {
      '200': {
        description: 'Responsable model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Responsable)) where?: Where<Responsable>,
  ): Promise<Count> {
    return this.responsableRepository.count(where);
  }

  @get('/responsables', {
    responses: {
      '200': {
        description: 'Array of Responsable model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Responsable)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Responsable)) filter?: Filter<Responsable>,
  ): Promise<Responsable[]> {
    return this.responsableRepository.find(filter,{ strictObjectIDCoercion: true });
  }

  @patch('/responsables', {
    responses: {
      '200': {
        description: 'Responsable PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Responsable, {partial: true}),
        },
      },
    })
    responsable: Responsable,
    @param.query.object('where', getWhereSchemaFor(Responsable)) where?: Where<Responsable>,
  ): Promise<Count> {
    return this.responsableRepository.updateAll(responsable, where);
  }

  @get('/responsables/{id}', {
    responses: {
      '200': {
        description: 'Responsable model instance',
        content: {'application/json': {schema: getModelSchemaRef(Responsable)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Responsable> {
    return this.responsableRepository.findById(id);
  }

  @patch('/responsables/{id}', {
    responses: {
      '204': {
        description: 'Responsable PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Responsable, {partial: true}),
        },
      },
    })
    responsable: Responsable,
  ): Promise<void> {
    await this.responsableRepository.updateById(id, responsable);
  }

  @put('/responsables/{id}', {
    responses: {
      '204': {
        description: 'Responsable PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() responsable: Responsable,
  ): Promise<void> {
    await this.responsableRepository.replaceById(id, responsable);
  }

  @del('/responsables/{id}', {
    responses: {
      '204': {
        description: 'Responsable DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.responsableRepository.deleteById(id);
  }
  // Propios
  // actualizar estatus
  @patch('/updatestatusres/{id}', {
    responses: {
      '204': {
        description: 'Responsable PATCH success',
      },
    },
  })
  async updatestatus(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Responsable, {partial: true}),
        },
      },
    })
    responsable: Responsable,
  ): Promise<void> {
    var verificador = await this.responsableRepository.findOne({ where: { id: id }, });
    if(verificador){
      responsable.nombres = verificador.nombres;
      if(verificador.enable){
        responsable.enable = false;
      }else{
        responsable.enable = true;
      }
      await this.responsableRepository.updateById(id, responsable);
    }else{
      throw new HttpErrors.BadRequest(`No se encontro el Responsable`);
    }
  }
}
