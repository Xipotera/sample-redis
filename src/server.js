const express = require('express')
const enrouten = require('express-enrouten')

const cron = require('node-cron')
const fs = require('fs')
const { storeResults } = require('./functions/store')
const { importExternalData } = require('./functions/import')

const { connectMongoDatabase, closeMongoConnection } = require('./connectors/mongo')

const initApp = async () => {
  const app = express()

  app.get('/ping', function (req, res) {
    res.send({ result: 'pong' })
  })

  // swagger initialization
  const expressSwagger = require('express-swagger-generator')(app)
  const options = require('./swagger')

  expressSwagger(options)

  // dynamic routes generation via enrouten
  app.use(enrouten({
    directory: './routes',
    routerOptions: {
      caseSensitive: true
    }
  }))

  app.listen(3000, function () {
    console.log('App listening on port 3000!')
  })
}
async function loadModels () {
  console.debug('Load All Models')
  // Load all Models JS files of the models directory
  const files = fs.readdirSync('./src/mongoose/models')
  return Promise.all(files.map(file => {
    const name = file.substr(0, file.indexOf('.'))
    require(`./mongoose/models/${name}`)

    return Promise.resolve(name)
  }))
}

try {
  connectMongoDatabase()
    .then(loadModels)
    .then(initApp)
    .catch((e) => {
      console.error(e.stack)
      process.exit(1)
    })
} catch (e) {
  console.error(e)
  process.exit(1)
}

/*
cron.schedule('*!/1 * * * *', async function () {
  console.log('Cron Job execution')
  await connectMongoDatabase()
  await importExternalData().then(async (results) => {
    await storeResults(results)
  }).catch(error => console.error(error))
  closeMongoConnection()
})
*/
