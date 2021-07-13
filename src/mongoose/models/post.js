const mongoose = require('mongoose')
const uid = require('uid2')
const { DefaultSchemaOptions } = require('../constants')
require('utils/stringExtensions')

const PostSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default () {
      return mongoose.Types.ObjectId(uid(12).toHexadecimal())
    }
  },
  externalId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, DefaultSchemaOptions)

module.exports = mongoose.model('Post', PostSchema)
