const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')

const { User, Tag, Event, ComedianToTag, comedianToEvent } = require("../../db/models")

const comedianEventRouter = require('./comedianEvent.js');

router.use("/events", comedianEventRouter)
router.get("/:id", asyncHandler (async (req, res) => {
  const comedian = await User.findByPk(req.params.id, {include: [Tag, Event]})
  res.json(comedian)
}))

router.get("/", asyncHandler (async (req, res) => {
  const comedians = await User.findAll({
    where: {comedian: true},
    include: [Event, Tag]})

  res.json(comedians)
}))









module.exports = router;