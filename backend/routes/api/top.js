const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')

const { User, Tag, Event, ComedianToTag, comedianToEvent } = require("../../db/models");
router.get('/', asyncHandler(async (req, res) => {
  const topComedians = await User.findAll({
    order: ["upVote"],
    limit: 1
  })
}))

module.exports = router