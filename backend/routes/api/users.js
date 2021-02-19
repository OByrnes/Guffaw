const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const asyncHandler = require('express-async-handler')

const {setTokenCookie, requireAuth} = require('../../utils/auth')
const {User} = require('../../db/models');
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
  const {email, password, firstName, lastName, comedian} = req.body;
  const user = await User.signup({email, firstName, lastName, password, comedian });
  await setTokenCookie(res, user)

  return res.json({
    user
  })
})))



module.exports = router;