const express = require('express')
const BookingRequest = require('../models/BookingRequest')
const BookingRequestRouter = express.Router()

BookingRequestRouter
  .route('/add').post(function (req, res) {
    const bookingrequest = new BookingRequest(req.body)
    bookingrequest.save()
      .then(bookingrequest => {
        res.send(bookingrequest)
      })
      .catch(err => {
        res.status(400).send(`Error: ${err}. Unable to save to database.`)
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

BookingRequestRouter
  .route('/decline').delete(function (req, res) {
    BookingRequest.deleteOne({
      'id': req.params.id
    },
    function (err, bookingrequest) {
      if (err) {
        res.send(`${err}. Unable to delete booking request.`)
      } else {
        res.json({ message: 'Booking request deleted.' })
      }
    })
  })

BookingRequestRouter
  .route('/accept').get(function (req, res) {
    BookingRequest.findOneAndUpdate(
      { _id: req.query.id },
      { state: 'accepted' },
      { new: true }, function (err, acceptedRequest) {
        if (err) {
          res.send(err)
        } else {
          res.json(acceptedRequest)
        }
      })
  })

module.exports = BookingRequestRouter
