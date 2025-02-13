'use strict';

const DiretoriaController = require('./DiretoriaController')
const DiretoriaSchema = require('./DiretoriaSchema')


module.exports = [
  {
    method: 'POST',
    path: '/diretoria',
    config: {
      handler: DiretoriaController.criarDiretor,
      description: 'adiciona novo membro da diretoria',
      tags: [ 'diretoria' ],
      validate: {
        payload: DiretoriaSchema.postDiretorSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/diretoria',
    config: {
      handler: DiretoriaController.buscarDiretoriaAtual,
      description: 'busca diretoria atual',
      tags: [ 'diretoria' ],
      validate: {
        query: DiretoriaSchema.getAllDiretoresSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/diretoria/historico',
    config: {
      handler: DiretoriaController.buscarHistoticoDiretoria,
      description: 'busca hitorico de diretorias',
      tags: [ 'diretoria' ],
      validate: {
        query: DiretoriaSchema.getAllDiretoresSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/diretoria/{cargo_slug}',
    config: {
      handler: DiretoriaController.buscarCargo,
      description: 'busca um diretor/cargo atual',
      tags: [ 'diretoria' ],
      validate: {
        params: DiretoriaSchema.slugCargoSchema
      }
    }
  },
  {
    method: 'PUT',
    path: '/diretoria/{cargo_slug}',
    config: {
      handler: DiretoriaController.atualizarCargo,
      description: 'atualiza um diretor/cargo atual',
      tags: [ 'diretoria' ],
      validate: {
        payload: DiretoriaSchema.postDiretorSchema,
        params: DiretoriaSchema.slugCargoSchema
      }
    }
  }
];