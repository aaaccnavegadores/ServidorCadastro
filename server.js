'use strict'

const {
    registerModels,
    connect: MongoConnect
  } = require('./config/mongoose_connection')

  
registerModels(__dirname + '/src/database/models')

const fs = require('fs')
const Hapi = require('@hapi/hapi')
const Vision = require('@hapi/vision')
const HapiApiVersion = require('hapi-api-version')
const options = {
  reporters: {
    myConsoleReporter: [
      {
        module: '@hapi/good-squeeze',
        name: 'Squeeze',
        args: [{
          ops: '*',
          log: '*',
          response: '*',
          error: '*'
        }]
      },
      {
        module: '@hapi/good-console',
        args: [
          {
            format: 'DD/MM/YYYY HH:mm:ss',
            color: true
          }
        ]
      },
      'stdout'
    ]
  }
}

const server = new Hapi.Server({
  port: 3000,
  debug: {
    request: '*',
    log: '*'
  },
  routes: {
    timeout: {
      server: 60 * 1000
    },
    cors: {
      origin: ['*']
    },
    security: {
      hsts: {
        maxAge: 15552000,
        includeSubdomains: true
      },
      xframe: true,
      xss: 'enabled',
      noOpen: false,
      noSniff: true
    },
    validate: {
      failAction: async (request, h, err) => {
        console.error(JSON.stringify(err))
        console.error(err.details)
        throw err
        
      }
    }
  }
})

const init = async () => {
  await MongoConnect()

  await server.register({
    plugin: require('@hapi/good'),
    options
  })
  await server.register({
    plugin: HapiApiVersion,
    options: {
      validVersions: [1, 2, 3, 4],
      defaultVersion: 1,
      vendorName: 'nave'
    }
  })
  await server.register(Vision)
  await server.start()

  fs.readdirSync('./src/interfaces/http').forEach(file => {
    const path = `./src/interfaces/http/${file}/${file}Routes.js`
    server.route(require(path))
  })

  return server
}

init().then(server => {
  console.log(`🚀 Server running at ${server.info.uri}`)
}).catch(err => {
  console.log(err)
})
