const userController = require('./../controller/userController')
const authController = require('./../controller/authController')
const authLimiter = require('./../Public/utils.js/limiter/authLimiter')
const express = require('express')
const imageProcessor = require('./../Public/utils.js/multer/user')
const multer = require('multer')
const router = express.Router()

// const upload = multer({dest:"public/img/users"})

// ALLOW USER TO SINGUP,RESET AND ETC WITHOUT LOGIN
router.
post('/signUp', authController.signUp)
// login route &&ratelimiter
router.post('/logIn',authLimiter, authController.logIn)
// protect routets allowing user to login after siignup
router.post('/protect', authController.protect)
// FORGOT PASSWORD
router.post('/forgotPassword', authController.forgotPassword)
// resetPassowrd
router.patch('/resetPassword/:token', authController.resetPassword)

// use protect as a middlewear in the below routes
// ONLY LOGGED IN USERS CAN UPDATE THEIR DETAILS
router.use(authController.protect)
// allow logged in user to update the password
router.patch('/updateMyPassword',
    authController.updatePassword
)
// updateme
router.patch('/updateMe',
    // imageProcessor.uploadUserPhoto,
    // imageProcessor.resizeUserPhoto,
    userController.updateMe
)
// deleteme
router.patch('/deleteMe', 
    userController.deleteMe
)
router.get('/me',
    userController.getMe,
    userController.getUser
)

// if a user can't update its details through updateMe/resetmypassword/deleteme
// in this instance allow admin to perform these actions manually

router.use(authController.restrictTo('admin'))
router.route('/')
.get(userController.getAllUser)
.post(userController.createUser)

router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser)

module.exports = router