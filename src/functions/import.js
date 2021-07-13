const axios = require('axios')
const { get } = require('lodash')

module.exports = {
  importExternalData: async () => {
    console.log('importExternalData')
    try {
      const url = 'https://gorest.co.in/public-api/posts'
      const options = {
        method: 'GET',
        url
      }
      const result = await axios(options)
      return get(result, 'data')
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

}
