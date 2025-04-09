const mongoose = require('mongoose')
const catchAsync = require('../Public/utils.js/catchAsync')
const Product = require('./productModel')

const reviewSchema = new mongoose.Schema({

    review:{
        type:String,
        required:[true,'review can not be empty'],
        max:[100,'Review exceeds the word limit-100'],
        min:[10, 'review mmust be 10 charecters long']
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,
    },
    createAt:{
        type:Date,
        default:Date.now,
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:[true,'review must belong to a product']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'A review must belongs to the user']

    },
    images:[String]
})
// index to allow a user to only post one review each product
// reviewSchema.index({user:1,product:1},{ unique: true })

// query to populat user and product in review
reviewSchema.pre(/^find/, function(next){
    this.populate({
        path:"user", 
        select:'name  photo'
    })
    // .populate({
    //     path:'product'
    // })
    next()
})

// check if admin or user who posted a review is deleting it >
reviewSchema.methods.checkUserAndAdmin = function(user){


 if(user.role !=='admin' && this.user._id.toString() !==user.id){
//   console.log(this.user._id.toString(),
// user.id)
    return false
 }
 return true


}

// calculate ratingsAverage on products through this model
// static method-which works on model itself
reviewSchema.statics.calRating = async function(productId){
     const stats = await this.aggregate([
        {
            $match:{product:productId}
        },
        {
            $group:{
                _id:"$product",
                nRatings:{$sum:1},
                avgRatings:{$avg:"$rating"},
                minRating:{$min:"$rating"},
                maxRating:{$max:"$Rating"}
            }
        }
     ])
    //  Update the product model
    const avg = stats[0].avgRatings
    const noofrating = stats[0].nRatings
    await Product.findByIdAndUpdate(productId,{
        ratingsAverage:avg,
        ratingsQuantity:noofrating
    },{
        validateBeforeSave:true,
        new:true
    })
}
// pid - 67e95c134c7d20012658b25a
// uid-

// intitate calrating after a review is been submitted
reviewSchema.pre('save',function( next){
    this.constructor.calRating(this.product)
    next()
})

reviewSchema.post(/^findOneAnd/,async function(doc){
   if(doc){
    // console.log("hey")
    await doc.constructor.calRating(doc.product)
   }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review