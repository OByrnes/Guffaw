const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { User } = require("../../db/models")
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
  const user = await User.signup({email, firstName, lastName, password, comedian, location });
  await setTokenCookie(res, user)

  return res.json({
    user
  })
})))

router.post('/:id/photo', singleMulterUpload("image"), asyncHandler( async (req, res) => {
  // console.log("request is =====================================",req)
  const profileImageUrl = await singlePublicFileUpload(req.file)
  const user = await User.findByPk(req.body.user.id)
  // console.log("user before update",user)
  await user.updateAttributes({userPhoto: profileImageUrl})
  // console.log(user)
}))

// router.get("/:id", asyncHandler(async (req, res) => {
  
// }))


module.exports = router;