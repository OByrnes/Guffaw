const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { User, Tag, Event, ComedianToTag, eventToTag, eventToType, comedianToEvent, FanToEvent,Type, Venue} = require("../../db/models")
const asyncHandler = require('express-async-handler');

router.get("/", asyncHandler (async (req, res) => {
  const tags = await Tag.findAll()

  res.json(tags)
}))

router.post("/new/comedian", asyncHandler (async (req, res) => {
  const {comedianId, tagText} = req.body
  const newTag = await Tag.create({tagText})
  console.log(newTag)
  const newComTag = await ComedianToTag.create({comedianId, tagId: newTag.id})
  res.json(newTag)
}))

router.post("/comedian" , asyncHandler (async (req, res) => {
  const {comedianId, tagId} = req.body
  const newComTag = await ComedianToTag.create({comedianId, tagId})
  const tag = await Tag.findByPk(tagId)
  res.json(tag)
  
}))

router.post("/new/event", asyncHandler (async (req, res) => {
  const {eventId, tagText} = req.body
  const newTag = await Tag.create({tagText})
  const newEvTag = await eventToTag.create({eventId, tagId: newTag.id})
  res.json(newTag)
}))

router.post("/event" , asyncHandler (async (req, res) => {
  const {eventId, tagId} = req.body
  const newEvTag = await eventToTag.create({eventId, tagId})
  const tag = await Tag.findByPk(tagId)
  res.json(tag)
}))

module.exports = router;