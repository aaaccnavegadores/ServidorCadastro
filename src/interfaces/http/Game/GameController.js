const axios = require('axios').default;
const Game = require('../../../database/models/Game')

module.exports.criarGame = async (request, h) => {
  console.log(request)
  const { payload } = request


  console.log('Adicionando jogo', payload)

  try{
    const game = await new Game(payload).save()
    return h.response(game).code(201)
  } catch (error) {
    console.log('Deu ruim pra criar', error)
    return h.response({ message: error.message }).code(500)
  }

}

module.exports.buscarGames = async (request, h) => {

  console.log('Buscando jogos')

  try {
    const games = await Game.find()
    return h.response(games).code(200)
  } catch (error) {
    console.log('Erro ao buscar jogos', error)
    return h.response({ message: 'Deu ruim' }).code(500)
  }
}

module.exports.buscarGame = async (request, h) => {

  const { params: { slug } } = request

  const filtro = {
    slug
  }

  console.log(`Buscando jogo ${slug}`, { slug })

  try{
    const game = await Game.findOne(filtro)

    if (!game) {
      return h.response({ message: 'Nao encontrado' }).code(404)
    }
    return h.response(game).code(200)
  } catch (error) {
    console.log('Deu ruim', error)
    return h.response({ message: 'Deu ruim' }).code(500)
  }
}
module.exports.atualizarGame = async (request, h) => {
  const { payload, params: { slug } } = request

  const filtro = {
    slug
  }
  const atualiza = {
    $set: payload
  }
  const config = {
    new: true
  }

  console.log(`atualizando jogo`, { slug, payload })

  try {
    const gameAtualizado = await Game.findOneAndUpdate(filtro, atualiza, config)
    return h.response(gameAtualizado).code(200)
  } catch (error) {
    console.log('Deu ruim pra atualizar', error)
    return h.response({ message: 'Deu ruim pra atualizar' }).code(500)
  }
}