'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const EsporteSchema = new Schema({
  nome: String,
  slug: String,
  desc: String
}, {
  timestamps: false,
  id: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  versionKey: false
})

EsporteSchema.index({ nome: 1 })
EsporteSchema.index({ slug: 1 })

module.exports = mongoose.model('Esporte', EsporteSchema)
