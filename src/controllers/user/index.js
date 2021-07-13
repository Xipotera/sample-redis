const axios = require('axios')
const { getCache, setCache } = require('../../connectors/redisCache')
const { get } = require('lodash')
module.exports = {
  getUserById: async ({ id }) => {
    try {
      const data = await getCache(`userid=${id}`)
      if (data !== null) {
        return {
          error: false,
          message: `User ${id} from the cache`,
          data
        }
      }

      const url = `https://gorest.co.in/public-api/users/${id}`
      const options = {
        method: 'GET',
        url
      }
      const result = await axios(options)
      if (get(result, 'data.data') !== null) {
        await setCache(`userid=${id}`, get(result, 'data.data'))
        return {
          error: false,
          message: `User ${id} from the server`,
          data: get(result, 'data.data')
        }
      }
    } catch (e) {
      console.error(e)
      return {
        error: true,
        message: 'An error occur',
        data: e
      }
    }
  }
}
