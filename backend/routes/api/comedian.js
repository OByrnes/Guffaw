const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')

const { User, Tag, Event, ComedianToTag, ComedianToEvent } = require("../../db/models")

router.get("/:id", asyncHandler (async (req, res) => {
  const comId = req.params.id

  console.log(comId)
  const tagsObjs= await ComedianToTag.findAll({
    where: { comedianId: comId },
    include: [{model: Tag}]
  })
   const tags = tagsObjs.map(tag => tag.Tag.tagText)
  // console.log("these are the tags=======================",tagsObjs[0].Tag.tagText)
  // const events = await ComedianToEvent.findAll({
  //   where:{comedianId: comId},
  //   include: [{model:Event}]
  // })
  res.json({tags:tags})
}))








module.exports = router;