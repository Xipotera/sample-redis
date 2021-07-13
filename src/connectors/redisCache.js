const redis = require('async-redis')
const client = redis.createClient({ url: 'redis://redis:6379' })

const expirationTime = process.env.CACHE_DURATION // in seconds

/**
 * 'movie.id='
 * @param key
 * @param data
 * @returns {Promise<void>}
 */
async function setCache (key, data) {
  return await set(key, JSON.stringify(data))
}

async function set (key, data) {
  await client.setex(key, expirationTime, data)
}

/**
 * 'movie.id='
 * @param key
 * @returns {Promise<any>}
 */
async function getCache (key) {
  const data = await get(key)
  return JSON.parse(data)
}

async function get (key) {
  return await client.get(key)
}

/**
 * 'movie.id='
 * @param key
 * @returns {Promise<*>}
 */
async function clearCache (key) {
  return await clear(key)
}

async function clear (key) {
  return await client.del(key)
}

module.exports = {
  getCache,
  setCache,
  clearCache
}
