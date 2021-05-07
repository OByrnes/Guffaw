const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { User, Tag, Event, comedianToTag, ComedianToEvent, FanToEvent, } = require("../../db/models")
const {
  singleMulterUpload,
  singlePublicFileUpload,
  multipleMulterUpload,
  multiplePublicFileUpload,
} = require("../../awsS3");
const { handleValidationErrors } = require('../../utils/validation');
const asyncHandler = require('express-async-handler')

const {setTokenCookie, requireAuth} = require('../../utils/auth')

const validateSignup =[
  check('email')
    .exists({checkFalsy: true})
    .isEmail()
    .withMessage("Please provide a valid email."),
  check('firstName')
    .not()
    .isEmail()
    .withMessage('Your first name is an email address? Try again?'),
  check('password')
    .exists({checkFalsy: true})
    .isLength({min: 6})
    .withMessage("Password must be 6 characters or more."),
  check('lastName')
    .exists({checkFalsy: true})
    .withMessage("Please enter a last name."),
  check("comedian")
    .isBoolean()
    .withMessage("Are you a comedian or an audience member?"),
  handleValidationErrors,


]
router.post('/',validateSignup, asyncHandler(asyncHandler( async (req, res) => {
  const {email, password, firstName, lastName, comedian, location} = req.body;
  const existingUser = await User.findOne({where: {email: email}})
  if(existingUser){
    return res.json(
      {"errors": ["this email is already in use"]}
    )
  }
  else{

    const user = await User.signup({email, firstName, lastName, password, comedian, location });
    await setTokenCookie(res, user)
    
    return res.json(
      user
    )
  }
})))

router.post('/:id/photo', singleMulterUpload("image"), asyncHandler( async (req, res) => {
  const profileImageUrl = await singlePublicFileUpload(req.file)
  const user = await User.findByPk(req.body.id)
  await user.update({userPhoto: profileImageUrl})
  
  return res.json(
    user.dataValues
  )

  
}))

router.post("/:id/description", asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.body.id)
  await user.update({description: req.body.description})
  return res.json(
    user.dataValues
  )
}))

// router.get("/:id", asyncHandler(async (req, res) => {
//   const tags = 
// }))


module.exports = router;