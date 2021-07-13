module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: process.env.MONGO_VERSION, // Version of MongoDB
      skipMD5: true
    },
    autoStart: false
  }
}
