const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { User, Tag, Event, comedianToTag, EventToTag, EventToType, ComedianToEvent, FanToEvent, } = require("../../db/models")
const {
  singleMulterUpload,
  singlePublicFileUpload,
  multipleMulterUpload,
  multiplePublicFileUpload,
} = require("../../awsS3");
const { handleValidationErrors } = require('../../utils/validation');
const asyncHandler = require('express-async-handler')


const validateNewEvent =[
  check('name')
    .exists({checkFalsy: true})
    .withMessage("Please provide an event name."),
  check('venueId')
    .exists({checkFalsy: true})
    .withMessage('Please add a venue'),
  check('date')
    .exists({checkFalsy: true})
    .withMessage("Please Provide a valid date"),
  handleValidationErrors,
]
router.get("/", asyncHandler (async (req, res) =>{
  const events = await Event.findAll({include: [EventToTag, EventToType, Venue]})
  res.json({events})
}))

router.get("/:id", asyncHandler (async (req, res)=>{
  const event = await Event.findByPk(req.params.id, {include: [EventToTag, EventToType, Venue]})

  res.json({event})
}))

router.post("/:id", validateNewEvent, singleMulterUpload("image"), asyncHandler (async (req, res) => {
  const newEvent = await Event.create(req.body)
  res.json({newEvent})
}))



module.exports = router;