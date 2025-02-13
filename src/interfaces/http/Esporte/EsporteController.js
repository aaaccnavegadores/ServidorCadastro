const axios = require('axios').default;
const Esporte = require('../../../database/models/Esporte')

module.exports.criarEsporte = async (request, h) => {
  console.log(request)
  const { payload } = request


  console.log('Adicionando esporte', payload)

  try{
    const esporte = await new Esporte(payload).save()
    return h.response(esporte).code(201)
  } catch (error) {
    console.log('Deu ruim pra criar', error)
    return h.response({ message: error.message }).code(500)
  }

}

module.exports.buscarEsportes = async (request, h) => {

  console.log('Buscando esportes')

  try {
    const esportes = await Esporte.find()
    return h.response(esportes).code(200)
  } catch (error) {
    console.log('Erro ao buscar esportes', error)
    return h.response({ message: 'Deu ruim' }).code(500)
  }
}

module.exports.buscarEsporte = async (request, h) => {

  const { params: { slug } } = request

  const filtro = {
    slug
  }

  console.log(`Buscando esporte ${slug}`, { slug })

  try{
    const esporte = await Esporte.findOne(filtro)

    if (!esporte) {
      return h.response({ message: 'Nao encontrado' }).code(404)
    }
    return h.response(esporte).code(200)
  } catch (error) {
    console.log('Deu ruim', error)
    return h.response({ message: 'Deu ruim' }).code(500)
  }
}
module.exports.atualizarEsporte = async (request, h) => {
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

  console.log(`atualizando esporte`, { slug, payload })

  try {
    const esporteAtualizado = await Esporte.findOneAndUpdate(filtro, atualiza, config)
    return h.response(esporteAtualizado).code(200)
  } catch (error) {
    console.log('Deu ruim pra atualizar', error)
    return h.response({ message: 'Deu ruim pra atualizar' }).code(500)
  }
}