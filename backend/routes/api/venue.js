const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { User, Tag, Event, Venue, comedianToTag, EventToTag, EventToType, ComedianToEvent, FanToEvent, } = require("../../db/models")
const asyncHandler = require('express-async-handler')
const { handleValidationErrors } = require('../../utils/validation');

const validateNewVenue =[
  check('name')
    .exists({checkFalsy: true})
    .withMessage("Please provide a venue name."),
  check('location')
    .exists({checkFalsy: true})
    .withMessage('Please add an address'),
  check('type')
    .exists({checkFalsy: true})
    .withMessage("Please select a type."),
  handleValidationErrors,
]
router.get('/', asyncHandler(async (req, res) => {
  const venues = await Venue.findAll()
  
  res.json(venues)
}))

router.get("/:id", asyncHandler(async (req, res) => {
  const venue = await Venue.findByPk(req.params.id)
  res.json({venue})
}))

router.post("/", validateNewVenue, asyncHandler (async (req, res) => {
  const newVenue = await Venue.create(req.body)
  res.json(newVenue)
}))


module.exports = router;