const mongoose = require('mongoose')
// subschema for pickuplocation

const pickupLocationSchema = new mongoose.Schema({
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      required: [true, 'Product must have pickup coordinates']
    },
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  }, { _id: false });
  

const productSchema = new mongoose.Schema({
name:{
    type:String,
    unique:true,
    required:[true,'A product must have a name'],
    maxLength:[40, 'A product can not be more than 40 charecters long'],
    minLength:[3,'A product must be 3 charecters long'],
    trim:true
},
category:{
    type:String,
    enum: ['electronics', 'clothing', 'shoes', 'accessories', 'books'], 
    required:[true,'A product must have a category']  

},
price:{
    type:Number,
    required:[true, 'A product must have a price']
},
description:{
    type:String,
    required:[true, 'A product must have a description']
},

ratingsAverage:{
    type:Number,
    default:4.5,
    max:[5,'rating can not be more than 5'],
    min:[1,'rating can not be less than 1 ']
},
images:[String],
imageCover:String,
ratingsQuantity:Number,
Stock:Number,
createdAt:Date,
brand:String,
discount:{
    type:Number,
    validate:{
        validator:function(val){
            return val<this.price

        },
      message:'Discount can not be greater than price itself'
    }
    },
// for claothing
size:{
    type:String,
    required:function(){
       return this.category.includes('clothing')
    }
}, 
gender:{
    type:String,
    enum:['male', 'female', "uniSex"],
    required:function(){
        return this.category && this.category.includes('clothing') 
    },
   
},
active:{
   type:Boolean,
   default:true
},
color:String,
// geoLocation
pickupLocation: {
    type: pickupLocationSchema,
    select: false
  }
  
},


{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
// ADD AN INDEX FOR PRICING
// productSchema.index({price:1})
// Index for ratingsQuantity
productSchema.index({ratingsQuantity:-1})
// index for category
productSchema.index({category:1})
// brand index
 productSchema.index({ brand: 1 });
//  compount index for price and ratingsAverage common user behaviour
productSchema.index({price:1,ratingsAverage:-1})


// virtual property 
productSchema.virtual('priceinINR').get(function(){
   return  this.price*50
})


// doc PRE MIDDLEWER
productSchema.pre('save', function(next){
    this.name= this.name.toLocaleLowerCase()
 
    next()
})


productSchema.virtual('reviews',{
    ref:'Review',
    foreignField:'product',
    localField:'_id'
})

// manipulate query to show active products hide deleted ones
productSchema.pre(/^find/, function(next){
    this.find({active:{$ne:false}}).select('-active')
    next()
})






const Product =  mongoose.model('Product', productSchema)

module.exports = Product
