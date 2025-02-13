'use strict';

const Joi = require('joi')

module.exports = {
  postEsporteSchema: Joi.object().keys({
    nome: Joi.string().trim().required().min(4).max(200),
    slug: Joi.string().trim().required(),
    desc: Joi.string().trim().optional().default('Sem descrição')
  }),
  getAllEsportesSchema: Joi.object().keys({
    page: Joi.number().optional().default(1),
    limit: Joi.number().optional().default(25)
  }),
  slugEsporteSchema: Joi.object().keys({
    slug: Joi.string().required()
  })
}
