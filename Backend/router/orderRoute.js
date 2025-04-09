const orderController = require('./../controller/orderController')
const authController = require('./../controller/authController')
const express= require('express')
const router = express.Router()


router.get('/checkout-session/:productId',authController.protect,
    orderController.getCheckoutSession
)

router.get('/my-orders/:id', authController.protect,
    orderController.getOrder)






module.exports =router