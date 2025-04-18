
const reviewController=require('./../controller/reviewController')
const authController = require('./../controller/authController')
const express= require('express')
const router = express.Router({mergeParams:true})

// ALLOW USERS TO SEE REVIEWS ONLY THROUGH GET ALL PRODUCTS


//two ways to access reviews-1.for users - /productId/reviews
// 2.for admin - /reviews - so allow users to access only

// const checkAdminPannel = (req,res,next)=>{
    
//         if(!req.params.productId){
//             return authController.restrictTo('admin')
//            (req,res,next)
//         }
//         next()
// }
// router.use(checkAdminPannel)


router.
route('/')
.get(reviewController.getAllReviews)


router.use(authController.protect)
    
router.route('/')
.post( authController.restrictTo('user'),
    reviewController.createReview)

// router('/:id')

router
.route('/:id')
.get(reviewController.getReview
)
.patch(authController.restrictTo('admin','user'),
    reviewController.updateReview)
.delete(authController.restrictTo('admin','user'),
    reviewController.deleteReview
)








module.exports =router