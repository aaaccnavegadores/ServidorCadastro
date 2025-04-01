const fs = require('fs')
const path = require('path')

const {
  DB_USER,
  DB_PASSWORD,
  DB_CLUSTER,
  DATABASE,
  DB_APPNAME
} = process.env

const mongoose = require('mongoose')

mongoose.set('strictPopulate', false)

const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.v59vh.mongodb.net/${DATABASE}?retryWrites=true&w=majority&appName=${DB_APPNAME}`


mongoose.connection.on('connected', () => {
  console.log('✅ Yes! MongoDB is connected!')
})

mongoose.connection.on('reconnecting', () => {
  console.log('😴 Trying, MongoDB is reconnecting...')
})

mongoose.connection.on('connecting', () => {
  console.log('⌛ Wait, MongoDB is connecting...')
})

mongoose.connection.on('error', (err) => {
  console.log('❌ Error, unable to connect to MongoDB!')

  console.error(err)
})

mongoose.connection.on('reconnected', () => {
  console.log('🏆 Win, MongoDB is reconnected!')
})

module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    } catch {}
  },
  isConnected: () => {
    return mongoose.STATES[mongoose.connection.readyState]
  },
  registerModels: (modelsPath) => {
    fs.readdirSync(modelsPath).forEach(file => {
      if (file.endsWith('.js')) {
        require(path.join(modelsPath, file))
      }
    })

    console.log('✅ Models registered successfuly')
  }
}
