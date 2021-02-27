const express = require('express')
const router = express.Router();
const { Op } = require("sequelize");

const { User, Tag, Event, comedianToTag, eventToTag, eventToType, comedianToEvent, fanToEvent,Type, Venue} = require("../../db/models")

const asyncHandler = require('express-async-handler');

router.patch("/", asyncHandler (async (req, res) => {
  const {firstName, lastName, location} = req.body
  const searchResults = await User.findAll({
    where: {
      [Op.or]: [
        {firstName: {
          [Op.iLike]: firstName
        }},
        {lastName: {
          [Op.iLike]: lastName
        }},
        {location: {
          [Op.iLike]: location
        }}
      ]
    }
  })
  res.json(searchResults)
}))

router.patch("/42", asyncHandler (async (req, res) => {
  const {location} = req.body
  let searchResults = await Venue.findAll({
    where: {
      [Op.or]: [
        {location: {
          [Op.substring]: location
        }
      }]},
      include:[Event]
})
  let eventResults = []
  searchResults.forEach(venue => {
    eventResults= [...venue.Events, ...eventResults]
  });
  res.json(eventResults)
}))




module.exports = router;