'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiretoriaSchema = new Schema({
  matricula: String,
  cargo: String,
  cargo_slug: String,
  ano_semestre_entrada: String,
  ano_semestre_saida: String,
  ativo: Boolean,
}, {
  timestamps: false,
  id: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  versionKey: false,
  collection: 'diretoria'
})

DiretoriaSchema.index({ matricula: 1, cargo_slug: 1 })
DiretoriaSchema.index({ ativo: 1 })

module.exports = mongoose.model('Diretoria', DiretoriaSchema)
