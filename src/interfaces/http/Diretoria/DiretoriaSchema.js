'use strict';

const Joi = require('joi')

module.exports = {
  postDiretorSchema: Joi.object().keys({
    matricula: Joi.string().trim().required(),
    cargo: Joi.string().trim().required(),
    cargo_slug: Joi.string().trim().required(),
    ano_semestre_entrada: Joi.string().trim().required(),
    ano_semestre_saida: Joi.when('ativo', { is: false, then: Joi.string().trim().required(), otherwise: Joi.forbidden() }),
    ativo: Joi.boolean().required()
  }),
  getAllDiretoresSchema: Joi.object().keys({
    page: Joi.number().optional().default(1),
    limit: Joi.number().optional().default(25)
  }),
  slugCargoSchema: Joi.object().keys({
    cargo_slug: Joi.string().required()
  })
}
