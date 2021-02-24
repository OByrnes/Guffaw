const router = require('express').Router()
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const comedianRouter = require("./comedian.js")
const eventsRouter = require("./events.js")
const venueRouter = require("./venue.js")

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use("/comedian", comedianRouter)

router.use("/events", eventsRouter)

router.use("/venues", venueRouter)


// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.post('/test', (req, res)=> {
//   res.json({requestBody: req.body})
// })


// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//       where: {
//         firstName: 'Demo'
//       },
//     })
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));


module.exports = router;