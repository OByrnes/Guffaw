const express = require('express')
const router = express.Router();
const { Op } = require("sequelize");
const { check } = require('express-validator');
const moment = require('moment')
const { User, Tag, Event, comedianToTag, eventToTag, eventToType, comedianToEvent, fanToEvent,Type, Venue} = require("../../db/models")
const {
  singleMulterUpload,
  singlePublicFileUpload,
  multipleMulterUpload,
  multiplePublicFileUpload,
} = require("../../awsS3");
const { handleValidationErrors } = require('../../utils/validation');
const asyncHandler = require('express-async-handler');



// const { types } = require('pg');


// const validateNewEvent =[
//   check('name')
//     .exists({checkFalsy: true})
//     .withMessage("Please provide an event name."),
//   check('venueId')
//     .exists({checkFalsy: true})
//     .withMessage('Please add a venue'),
//   check('date')
//     .exists({checkFalsy: true})
//     .withMessage("Please Provide a valid date"),
//   handleValidationErrors,
// ]
router.get("/", asyncHandler (async (req, res) =>{
  const events = await Event.findAll({include: [eventToTag, eventToType, Venue]})
  
  
  res.json(events)
}))
router.delete("/:id", asyncHandler (async (req, res) => {
  const oldEvent = await Event.findByPk(req.params.id)
  
    eventToTag.destroy({where: {
      eventId: oldEvent.id
    }})
    eventToType.destroy({where: {
      eventId: oldEvent.id
    }})
    comedianToEvent.destroy({where:{
      eventId: oldEvent.id
    }})
    oldEvent.destroy()
 res.json({msg:"event deleted"})
}))
router.get("/:id", asyncHandler (async (req, res)=>{
  const event = await Event.findByPk(req.params.id, {include: [eventToTag, eventToType, Type, Tag, comedianToEvent, Venue, User]})

  res.json(event)
}))

router.post("/", singleMulterUpload("image"), asyncHandler (async (req, res) => {
  const eventImageUrl = await singlePublicFileUpload(req.file)
  let {name, venueId, date, recurring, description, host, price, ticketed, types} = req.body
  
  const newEvent = await Event.create({name, venueId, eventPhoto: eventImageUrl, date, recurring, description, host, ticketed, price})
  types.split(',').forEach( async type => await eventToType.create({eventId: newEvent.id, typeId: Number(type)}))
  
  
  res.json(newEvent)
}))

router.put("/:id", asyncHandler (async (req, res) => {
  const {eventId, comedianId} = req.body
  await comedianToEvent.create({comedianId, eventId})
  let comic = await User.findByPk(comedianId)
  res.json(comic)
}))

router.post("/addvenue", singleMulterUpload("image"), asyncHandler (async (req, res) => {
  const eventImageUrl = await singlePublicFileUpload(req.file)
  let {name, venueName, venueLocation, venueWebsiteUrl, venueType, date, recurring, description, host, price, ticketed, types} = req.body

  const newVenue = await Venue.create({name:venueName, location: venueLocation, websiteUrl:venueWebsiteUrl, type: venueType})
  
  const newEvent = await Event.create({name, venueId:newVenue.id, eventPhoto: eventImageUrl, date, recurring, description, host, ticketed, price})
  types.split(',').forEach( async type => await eventToType.create({eventId: newEvent.id, typeId: Number(type)}))
  
  res.json(newEvent)
}))

module.exports = router;