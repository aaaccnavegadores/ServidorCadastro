const axios = require('axios').default;
const Membro = require('../../../database/models/Membro')
const EnumMensagem = require('../../../domain/enum/EnumMensagem')
const EnumCodigosHTTP = require('../../../domain/enum/EnumCodigosHTTP')

module.exports.criarMembro = async (request, h) => {
  console.log(request)
  const { payload } = request

  payload.cpf = payload.cpf.replace(/[.-]/g, '')

  const verificarMembro = {
    $or: [
      { matricula: payload.matricula },
      { cpf: payload.cpf },
      { email: payload.email }
    ]
  }

  const membroExiste = await Membro.find(verificarMembro)

  if (membroExiste.length) {
    console.log('[arquivo: MembroController -> funcao: criarMembro] Este membro já está cadastrado. Matrícula, cpf ou email já existe', membroExiste)
    return h.response({ message: EnumMensagem.MEMBRO_EXISTENTE }).code(EnumCodigosHTTP.BAD_REQUEST)
  }

  const anoAtual = new Date().getFullYear()
  const semestreAtual = new Date().getMonth() < 6 ? 1 : 2
  payload.ano_semestre_entrada = `${anoAtual}.${semestreAtual}`
  
  payload.ativo = true
  payload.concorda_termos = true
  payload.atualizado = true

  payload.endereco.estado = "Santa Catarina",
  payload.endereco.pais = "Brasil",


  console.log('[arquivo: MembroController -> funcao: criarMembro] Adicionando membro', payload)

  try{
    const membro = await new Membro(payload).save()
    return h.response(membro).code(EnumCodigosHTTP.CREATED)
  } catch (error) {
    console.log('[arquivo: MembroController -> funcao: criarMembro] Houve uma falha ao criar novo membro', error)
    return h.response({ message: EnumMensagem.FALHA_CRIAR_MEMBRO }).code(EnumCodigosHTTP.INTERNAL)
  }

}

module.exports.buscarMembros = async (request, h) => {

  console.log('[arquivo: MembroController -> funcao: buscarMembros] Buscando membros')

  try {
    const membros = await Membro.find()
    return h.response(membros).code(EnumCodigosHTTP.OK)
  } catch (error) {
    console.log('[arquivo: MembroController -> funcao: buscarMembros] Falha ao buscar todos os membros', error)
    return h.response({ message: EnumMensagem.FALHA_BUSCAR_TODOS_MEMBROS }).code(EnumCodigosHTTP.INTERNAL)
  }
}

module.exports.buscarMembroPorId = async (request, h) => {

  const { params: { membro_id } } = request

  const filtro = {
    _id: membro_id
  }

  console.log(`[arquivo: MembroController -> funcao: buscarMembroPorId] Buscando membro pelo id ${membro_id}`, { membro_id })

  try{
    const membro = await Membro.findOne(filtro)

    if (!membro) {
      return h.response({ message: EnumMensagem.MEMBRO_NAO_ENCONTRADO }).code(EnumCodigosHTTP.NOT_FOUND)
    }
    return h.response(membro).code(EnumCodigosHTTP.OK)
  } catch (error) {
    console.log('[arquivo: MembroController -> funcao: buscarMembroPorId] Falha ao buscar membro', error)
    return h.response({ message: EnumMensagem.FALHA_BUSCAR_MEMBRO }).code(EnumCodigosHTTP.INTERNAL)
  }
}

module.exports.buscarMembroPorDocumento = async (request, h) => {

  const { query } = request

  console.log(query)

  console.log(`[arquivo: MembroController -> funcao: buscarMembroPorId] Buscando membro pelo documento`, { query })

  try{
    const membro = await Membro.findOne(query)

    if (!membro) {
      return h.response({ message: EnumMensagem.MEMBRO_NAO_ENCONTRADO }).code(EnumCodigosHTTP.NOT_FOUND)
    }
    return h.response(membro).code(EnumCodigosHTTP.OK)
  } catch (error) {
    console.log('[arquivo: MembroController -> funcao: buscarMembroPorDocumento] Falha ao buscar membro', error)
    return h.response({ message: EnumMensagem.FALHA_BUSCAR_MEMBRO }).code(EnumCodigosHTTP.INTERNAL)
  }
}

module.exports.buscarMembrosAtivos = async (request, h) => {

  const filtro = {
    ativo: true
  }

  console.log(`[arquivo: MembroController -> funcao: buscarMembrosAtivos] Buscando membros ativos`)

  try{
    const membro = await Membro.find(filtro)

    return h.response(membro).code(EnumCodigosHTTP.OK)
  } catch (error) {
    console.log('[arquivo: MembroController -> funcao: buscarMembrosAtivos] Falha ao buscar os membros ativos', error)
    return h.response({ message: EnumMensagem.FALHA_BUSCAR_MEMBROS_ATIVOS }).code(EnumCodigosHTTP.INTERNAL)
  }
}
module.exports.atualizarMembro = async (request, h) => {
  const { payload, params: { membro_id } } = request

  const filtro = {
    _id: membro_id
  }
  const atualiza = {
    $set: payload
  }
  const config = {
    new: true
  }

  console.log(`[arquivo: MembroController -> funcao: atualizarMembro] Atualizando membro`, { membro_id, payload })

  try {
    const membroAtualizado = await Membro.findOneAndUpdate(filtro, atualiza, config)
    return h.response(membroAtualizado).code(EnumCodigosHTTP.OK)
  } catch (error) {
    console.log('[arquivo: MembroController -> funcao: atualizarMembro] Houve uma falha ao atualizar membro', error)
    return h.response({ message: EnumMensagem.FALHA_ATUALIZAR_MEMBRO }).code(EnumCodigosHTTP.INTERNAL)
  }
}