const express = require('express')
const router = express.Router();

const { User, Tag, Event, comedianToTag, eventToTag, eventToType, comedianToEvent, fanToEvent,Type, Venue} = require("../../db/models")

const asyncHandler = require('express-async-handler');

router.get("/:id", asyncHandler (async (req, res) => {
  console.log("this is the id????????????????????????????????",req.params.id)
  const fanEvents = await fanToEvent.findAll({where:{fanId:req.params.id}, include: [Event]})
  res.json(fanEvents)
}))

router.patch("/", asyncHandler (async (req, res) => {
  
  const fanLike = await fanToEvent.create(req.body)
  res.json(fanLike)
}))










module.exports = router;