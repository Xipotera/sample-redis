module.exports = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      description: '',
      version: '1.0.0',
      title: 'Backend API',
      termsOfService: '',
      contact: {
        email: 'mathieuvie@gmail.com'
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
      }
    },
    host: 'localhost:8081',
    basePath: '/api',
    tags: [
    ],
    schemes: [
      'https'
    ],
    paths: {
    },
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: ''
      }
    },
    definitions: {
    }
  },
  basedir: __dirname,
  files: ['./routes/**/*.js']
}
