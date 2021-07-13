const mongoose = require('mongoose')
const uid = require('uid2')
const { DefaultSchemaOptions } = require('../constants')

require('utils/stringExtensions')
// Create a simple User's schema
const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default () {
      return mongoose.Types.ObjectId(uid(12).toHexadecimal())
    }
  },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: Date,
  loginUsing: String
}, DefaultSchemaOptions)

module.exports = mongoose.model('User', userSchema)
