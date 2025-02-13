'use strict';

const Joi = require('joi')

module.exports = {
  postGameSchema: Joi.object().keys({
    titulo: Joi.string().trim().required().min(4).max(200),
    slug: Joi.string().trim().required(),
    tipo: Joi.string().trim().optional()
  }),
  getAllGamesSchema: Joi.object().keys({
    page: Joi.number().optional().default(1),
    limit: Joi.number().optional().default(25)
  }),
  slugGameSchema: Joi.object().keys({
    slug: Joi.string().required()
  })
}
