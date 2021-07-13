const Promise = require('bluebird')
const mongoose = require('mongoose')
const { get } = require('lodash')

async function storeResults (results) {
  const Post = mongoose.model('Post')
  await Promise.map(results.data, async (result) => {
    const post = await Post.findOneAndUpdate({ externalId: result.id }, {
      externalId: result.id,
      title: result.title,
      content: result.body
    }, {
      new: true,
      upsert: true,
      rawResult: true
    })

    if (!get(post, 'lastErrorObject.updatedExisting')) console.info(`insert new document with externalId : ${get(post, 'value.externalId')}`)
  })
}

module.exports = { storeResults }
