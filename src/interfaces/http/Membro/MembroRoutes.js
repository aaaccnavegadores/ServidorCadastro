'use strict';

const MembroController = require('./MembroController')
const MembroSchema = require('./MembroSchema')


module.exports = [
  {
    method: 'POST',
    path: '/membros',
    config: {
      handler: MembroController.criarMembro,
      description: 'adiciona novo membro',
      tags: [ 'membros' ],
      validate: {
        payload: MembroSchema.postMembroSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/membros',
    config: {
      handler: MembroController.buscarMembros,
      description: 'busca todos os membros',
      tags: [ 'membros' ],
      validate: {
        query: MembroSchema.getAllMembrosSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/membros/{membro_id}',
    config: {
      handler: MembroController.buscarMembroPorId,
      description: 'busca membro por id',
      tags: [ 'membros' ],
      validate: {
        params: MembroSchema.MembroIdSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/membros/documento',
    config: {
      handler: MembroController.buscarMembroPorDocumento,
      description: 'busca membro por cpf ou matricula',
      tags: [ 'membros' ],
      validate: {
        query: MembroSchema.MembroDocumentoSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/membros/ativos',
    config: {
      handler: MembroController.buscarMembrosAtivos,
      description: 'busca membros ativos',
      tags: [ 'membros' ]
    }
  },
  {
    method: 'PUT',
    path: '/membros/{membro_id}',
    config: {
      handler: MembroController.atualizarMembro,
      description: 'atualiza membro',
      tags: [ 'membros' ],
      validate: {
        payload: MembroSchema.putMembroSchema,
        params: MembroSchema.MembroIdSchema
      }
    }
  }
];