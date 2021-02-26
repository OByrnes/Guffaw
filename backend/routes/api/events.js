const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
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
  let updatedEvent = await Event.findByPk(eventId, {include: [User, Venue, Tag]})
  res.json(updatedEvent)
}))


module.exports = router;