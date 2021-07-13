
module.exports = async function (router) {
  /**
   * This function comment is parsed by doctrine
   * @route GET /api/ping
   * @group global - Ping Pong
   * @returns {object} 200 - An object with pong result
   * @returns {Error}  default - Unexpected error
   */
  router.get('/', (req, res) => res.status(200).json({ result: 'pong' }))
}
