
'use strict'

const Joi = require('joi')
const { isValidObjectId } = require('mongoose')

module.exports = Joi.extend(
  (joi) => {
    return {
      type: 'object',
      base: joi.object(),
      coerce: {
        from: 'string',
        method (schema, value, helpers) {
          if (value.original !== '{' && !/^\s*\{/.test(value.original)) {
            return
          }
          try {
            return { value: JSON.parse(value.original) }
          } catch (ignoreErr) { }
        }
      }
    }
  },
  (joi) => {
    return {
      type: 'jwt',
      base: joi.string(),
      messages: {
        'invalid_jwt': '{{#label}} is not a valid jwt token pattern'
      },
      validate(value, helpers) {
        const jwtRegExp = new RegExp(/^(Bearer )?[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
        const isValidJwt = jwtRegExp.test(value)
        if (!isValidJwt) {
          return { errors: helpers.error('invalid_jwt') }
        }
      }
    }
  },
  (joi) => {
    return {
      type: 'objectId',
      base: joi.string(),
      messages: {
        'invalid_mongo_id': '{{#label}} is not a valid mongo id pattern'
      },
      validate(value, helpers) {
        if (!isValidObjectId(value)) {
          return { errors: helpers.error('invalid_mongo_id') }
        }
      }
    }
  }
)
