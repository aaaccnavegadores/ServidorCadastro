const axios = require('axios').default;
const Diretoria = require('../../../database/models/Diretoria')
const Membro = require('../../../database/models/Membro')
const EnumMensagem = require('../../../domain/enum/EnumMensagem')
const EnumCodigosHTTP = require('../../../domain/enum/EnumCodigosHTTP')

module.exports.criarDiretor = async (request, h) => {
  console.log(request)
  const { payload } = request

  const verificarMatricula = {
    matricula: payload.matricula
  }

  const membro = await Membro.findOne(verificarMatricula)

  if (!membro) {
    console.log('[arquivo: DiretoriaController -> funcao: criarDiretor] Esta matricula não pertence a nenhum membro', { matricula: payload.matricula })
    return h.response({ message: EnumMensagem.DIRETOR_NAO_MEMBRO }).code(EnumCodigosHTTP.BAD_REQUEST)
  }

  console.log('[arquivo: DiretoriaController -> funcao: criarDiretor] Adicionando diretor', payload)

  try{
    const diretor = await new Diretoria(payload).save()
    return h.response(diretor).code(EnumCodigosHTTP.CREATED)
  } catch (error) {
    console.log('[arquivo: DiretoriaController -> funcao: criarDiretor] Erro ao tentar adicionar diretor', error)
    return h.response({ message: EnumMensagem.FALHA_CRIAR_DIRETOR }).code(EnumCodigosHTTP.INTERNAL)
  }

}

module.exports.buscarDiretoriaAtual = async (request, h) => {

  const filtro = {
    ativo: true
  }

  console.log(`[arquivo: DiretoriaController -> funcao: buscarDiretoriaAtual] Buscando diretoria atual`, filtro)

  try{
    const diretoria = await Diretoria.find(filtro)

    if (!diretoria) {
      console.log('[arquivo: DiretoriaController -> funcao: buscarDiretoriaAtual] Diretoria não encontrada')
      return h.response({ message: EnumMensagem.SEM_DIRETORIA }).code(EnumCodigosHTTP.NOT_FOUND)
    }
    return h.response(diretoria).code(EnumCodigosHTTP.OK)
  } catch (error) {
    console.log('[arquivo: DiretoriaController -> funcao: buscarDiretoriaAtual] Falha ao buscar diretoria atual', error)
    return h.response({ message: EnumMensagem.FALHA_BUSCAR_DIRETORIA }).code(EnumCodigosHTTP.INTERNAL)
  }
}

module.exports.buscarHistoticoDiretoria = async (request, h) => {

  console.log('[arquivo: DiretoriaController -> funcao: buscarHistoticoDiretoria] Buscando historico da diretoria')

  try {
    const historico = await Diretoria.find()
    return h.response(historico).code(EnumCodigosHTTP.OK)
  } catch (error) {
    console.log('[arquivo: DiretoriaController -> funcao: buscarHistoticoDiretoria] Falha ao buscar hitorico', error)
    return h.response({ message: EnumCodigosHTTP.FALHA_HISTORICO }).code(EnumCodigosHTTP.INTERNAL)
  }
}

module.exports.buscarCargo = async (request, h) => {

  const { params: { cargo_slug } } = request

  const filtro = {
    cargo_slug,
    ativo: true
  }

  console.log(`[arquivo: DiretoriaController -> funcao: buscarCargo] Buscando pelo cargo ${cargo_slug}`, filtro)
  
  try{
    const diretor = await Diretoria.findOne(filtro)
    
    if (!diretor) {
      console.log(`[arquivo: DiretoriaController -> funcao: buscarCargo] Cargo não encontrado`, filtro)
      return h.response({ message: EnumMensagem.CARGO_NAO_ENCONTRAD }).code(EnumCodigosHTTP.NOT_FOUND)
    }
    return h.response(diretor).code(EnumCodigosHTTP.OK)
  } catch (error) {
    console.log('[arquivo: DiretoriaController -> funcao: buscarCargo] Erro ao buscar cargo', error)
    return h.response({ message: EnumMensagem.FALHA_BUSCAR_CARGO }).code(EnumCodigosHTTP.INTERNAL)
  }
}

module.exports.atualizarCargo = async (request, h) => {
  const { payload, params: { cargo_slug } } = request

  const filtro = {
    cargo_slug,
    ativo: true
  }
  const atualiza = {
    $set: payload
  }
  const config = {
    new: true
  }

  console.log(`[arquivo: DiretoriaController -> funcao: atualizarCargo] atualizando cargo`, { filtro, payload })

  try {
    const cargoAtualizado = await Diretoria.findOneAndUpdate(filtro, atualiza, config)
    return h.response(cargoAtualizado).code(EnumCodigosHTTP.OK)
  } catch (error) {
    console.log('[arquivo: DiretoriaController -> funcao: atualizarCargo] Erro ao atualizar cargo', error)
    return h.response({ message: EnumMensagem.FALHA_ATUALIZAR_CARGO }).code(EnumCodigosHTTP.INTERNAL)
  }
}