const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')

const { User, Tag, Event, ComedianToTag, comedianToEvent } = require("../../db/models");
const { get } = require('./comedian');

router.get("/:id", asyncHandler( async (req, res) => {
  const comediansOnEvent = await comedianToEvent.findAll({where: { eventId: req.params.id}, include: [User]})
  res.json(comediansOnEvent)
}))


module.exports = router