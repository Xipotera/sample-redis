const { getUserById } = require('../../../controllers/user')

module.exports = function (router) {
  router.get('/:id', async (req, res) => {
    const result = await getUserById(req.params)
    res.status(200).send(result)
  })
}
