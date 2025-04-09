const Review = require('./../model/reviewModel')
const catchAsync = require('./../Public/utils.js/catchAsync')
const AppError = require('./../Public/utils.js/appError')
const factory = require('./handleFactory')

exports.getAllReviews = factory.getAll(Review)
exports.createReview=factory.createOne(Review)
exports.getReview = factory.getOne(Review)




exports.updateReview = catchAsync(async(req,res,next)=>{
    

//   check if the review belongs to the logged in user
// keeping it seprate since queryonly allows operations for actual user who posted the review

    const review = await Review.findOneAndUpdate({_id:req.params.id, user:req.user.id}, req.body,{
        new:true,
        runValidators:true
    })
    if(!review){
       return next(new AppError("you are not allowed to perform this action", 403))
    }
    res.status(201).json({
        status:"success",
        message:"review has been changed",
        data:{
            review
        }
    })

  })

  exports.deleteReview = catchAsync(async(req,res,next)=>{
    const review = await Review.findById(req.params.id);

    const check =await review.checkUserAndAdmin(req.user)
    // console.log(check)
    if(!check){
        return next(new AppError("Permission Denied", 403))
    }
    // delete the review
    await Review.findByIdAndDelete(req.params.id)
      

    res.status(200)
    .json({
        status:"success",
        message:"your review has been deleted",
        data:null
    })
  }) 
// 67e7d528310c042fd5166e50rid
// uid67e51ae28b3a9dafed16a25d
// actual user - user -67e69306bdc32aeeff7ba689