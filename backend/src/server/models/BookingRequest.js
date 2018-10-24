const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingRequest = new Schema({
  name: {
    type: String
  },
  number: {
    type: String
  },
  expiry: {
    type: String
  },
  cvc: {
    type: String
  }
}, { collection: 'bookingrequest' })

module.exports = mongoose.model('BookingRequest', BookingRequest)
