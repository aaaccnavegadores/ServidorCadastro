'use strict';

const GameController = require('./GameController')
const GameSchema = require('./GameSchema')


module.exports = [
  {
    method: 'POST',
    path: '/games',
    config: {
      handler: GameController.criarGame,
      description: 'adiciona novo jogo',
      tags: [ 'games' ],
      validate: {
        payload: GameSchema.postGameSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/games',
    config: {
      handler: GameController.buscarGames,
      description: 'busca todos os jogos',
      tags: [ 'games' ],
      validate: {
        query: GameSchema.getAllGamesSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/games/{slug}',
    config: {
      handler: GameController.buscarGame,
      description: 'busca um jogo',
      tags: [ 'games' ],
      validate: {
        params: GameSchema.slugGameSchema
      }
    }
  },
  {
    method: 'PUT',
    path: '/games/{slug}',
    config: {
      handler: GameController.atualizarGame,
      description: 'atualiza jogo',
      tags: [ 'games' ],
      validate: {
        payload: GameSchema.postGameSchema,
        params: GameSchema.slugGameSchema
      }
    }
  }
];