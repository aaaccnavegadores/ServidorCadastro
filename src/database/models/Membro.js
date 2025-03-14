'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EnderecoSchema = new Schema({
  cep: String,
  rua: String,
  numero: String,
  bairro: String,
  complemento: String,
  cidade: String,
  estado: String,
  pais: String,
}, {
  _id: false,
  id: false,
  timestamps: false,
  versionKey: false
})

const PunicaoSchema = new Schema({
  tipo: String,
  motivo: String,
  artigo_estatuto_codigo: String,
  data_inicio: Date,
  data_fim: Date
}, {
  _id: false,
  id: false,
  timestamps: false,
  versionKey: false
})


const MembroSchema = new Schema({
  nome: String,
  matricula: String,
  cpf: String,
  email: String,
  endereco: EnderecoSchema,
  telefone: String,
  telefone_emergencia: String,
  condicao: String,
  ativo: Boolean,
  ano_semestre_entrada: String,
  ano_semestre_saida: String,
  categoria: String,
  ocupacao: String,
  esportes: Array,
  games: Array,
  concorda_termos: Boolean,
  atualizado: Boolean,
  punicao: PunicaoSchema
}, {
  id: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  versionKey: false
})

MembroSchema.index({ email: 1 })
MembroSchema.index({ nome: 1 })
MembroSchema.index({ cpf: 1 })
MembroSchema.index({ matricula: 1 })
MembroSchema.index({ telefone: 1 })
MembroSchema.index({ ano_semestre_entrada: 1 })
MembroSchema.index({ ano_semestre_saida: 1 })
MembroSchema.index({
  nome: 'text',
  email: 'text'
})

module.exports = mongoose.model('Membro', MembroSchema)
