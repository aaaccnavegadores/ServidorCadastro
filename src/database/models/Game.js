'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const GameSchema = new Schema({
  titulo: String,
  slug: String,
  tipo: String
}, {
  timestamps: false,
  id: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  versionKey: false
})

GameSchema.index({ nome: 1 })
GameSchema.index({ slug: 1 })
GameSchema.index({ tipo: 1 })

module.exports = mongoose.model('Game', GameSchema)
