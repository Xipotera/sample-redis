const mongoose = require('mongoose')

let i = 0
module.exports = {
  connectMongoDatabase: () => new Promise((resolve, reject) => {
    const userAuth = process.env.MONGO_APP_USERNAME ? `${process.env.MONGO_APP_USERNAME}:${process.env.MONGO_APP_PASSWORD}@` : ''
    const url = `mongodb://${userAuth}${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_APP_DATABASE}?authSource=${process.env.MONGO_INITDB_DATABASE}&w=1`

    // Get Mongoose to use the global promise library
    const options = {
      promiseLibrary: global.Promise,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
    console.debug(`Mongo URL : ${url}`)
    console.info('Try to connect to mongo ...')
    mongoose.Promise = global.Promise
    // Get the default connection
    mongoose.connect(url, options)
    const db = mongoose.connection

    db.once('open', () => {
      console.info('Mongoose connected to Mongo !')
      return resolve()
    })
    // Bind connection to error event (to get notification of connection errors)
    db.on('error', (e) => {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec')
      // console.alert(e.message);
      i += 1
      if (i > 3) {
        return reject(e)
      }
      setTimeout(this.connectMongoDatabase, 5000)
    })

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => db.close(() => {
      console.info('Mongoose default connection disconnected through app termination')
      process.exit(0)
    }))
  }),
  closeMongoConnection: () => {
    mongoose.connection.close()
    console.info('Close Mongoose connection')
    console.info('-------------------------')
  }
}
