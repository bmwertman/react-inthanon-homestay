const express = require('express')
const BookingRequest = require('../models/BookingRequest')
const BookingRequestRouter = express.Router()

BookingRequestRouter
  .route('/add').post(function (req, res) {
    console.log('The Add route got hit')
    const bookingrequest = new BookingRequest(req.body)
    bookingrequest.save()
      .then(bookingrequest => {
        res.json('Request to book successfully submitted')
      })
      .catch(err => {
        res.status(400).send(`Error: ${err} .Unable to save to database`)
      })
  })

BookingRequestRouter
  .route('/').get(function (req, res) {
    BookingRequest.find(function (err, bookingrequests) {
      if (err) {
        console.log(err)
      } else {
        res.json(bookingrequests)
      }
    })
  })
module.exports = BookingRequestRouter
