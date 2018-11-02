const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingRequest = new Schema({
  name: {
    type: String
  },
  from: {
    type: String
  },
  to: {
    type: String
  },
  room: {
    type: Number
  },
  adult: {
    type: Number
  },
  child: {
    type: Number
  },
  infant: {
    type: Number
  },
  state: {
    type: String
  }
}, { collection: 'bookingrequest' })

module.exports = mongoose.model('BookingRequest', BookingRequest)
