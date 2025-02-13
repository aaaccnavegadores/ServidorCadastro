'use strict';

const EsporteController = require('./EsporteController')
const EsporteSchema = require('./EsporteSchema')


module.exports = [
  {
    method: 'POST',
    path: '/esportes',
    config: {
      handler: EsporteController.criarEsporte,
      description: 'adiciona novo esporte',
      tags: [ 'esportes' ],
      validate: {
        payload: EsporteSchema.postEsporteSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/esportes',
    config: {
      handler: EsporteController.buscarEsportes,
      description: 'busca todos os esportes',
      tags: [ 'esportes' ],
      validate: {
        query: EsporteSchema.getAllEsportesSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/esportes/{slug}',
    config: {
      handler: EsporteController.buscarEsporte,
      description: 'busca um membro',
      tags: [ 'esportes' ],
      validate: {
        params: EsporteSchema.slugEsporteSchema
      }
    }
  },
  {
    method: 'PUT',
    path: '/esportes/{slug}',
    config: {
      handler: EsporteController.atualizarEsporte,
      description: 'atualiza esporte',
      tags: [ 'esportes' ],
      validate: {
        payload: EsporteSchema.postEsporteSchema,
        params: EsporteSchema.slugEsporteSchema
      }
    }
  }
];