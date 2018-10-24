
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const BookingRequestRouter = require('./routes/BookingRequestRouter')
const PORT = 4200

mongoose
  .connect('mongodb://localhost:27017/db', {
    useNewUrlParser: true
  })
  .then(
    () => { console.log('Database is connected') },
    err => { console.log(`Error: ${err} Can not connect to the database`) }
  )
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/bookingrequest', BookingRequestRouter)
app.use(function (req, res, next) {
  // res.header('Access-Control-Allow-Credentials', true)
  res.set('Access-Control-Allow-Origin', '*')
  next()
})

module.exports = {
  start: function () {
    app.listen(PORT, () => {
      console.log('Server is running on Port: ', PORT)
    })
  },
  stop: function () {
    app.close(PORT, () => {
      console.log(`Shut down on port: ${PORT}`)
    })
  }
}
