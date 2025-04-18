const mongoose = require('mongoose')
// subschema for pickuplocation

  

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
// discount:{
//     type:Number,
//     validate:{
//         validator:function(val){
//             return val<this.price

//         },
//       message:'Discount can not be greater than price itself'
//     }
//     },
// for claothing
size:{
    type:String,
},
//     required:function(){
//        return this.category.includes('clothing')
//     }
// }, 
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

// for size validation 
productSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate(); // fields being updated
    const idQuery = this.getQuery(); // filter like { _id: '...' }
  
    // Get the current document from DB
    const existing = await this.model.findOne(idQuery);
  
    if (!existing) {
      return next(); // Let the actual controller handle missing doc
    }
  
    const finalCategory = update.category || existing.category;
    const finalSize = update.size || existing.size;
  
    if (finalCategory?.includes('clothing') && (!finalSize || finalSize.trim() === '')) {
      return next(new Error('Size is required for clothing category'));
    }
  
    next();
  });

  productSchema.pre('save', function (next) {
    if (
      this.category?.includes('clothing') &&
      (!this.size || this.size.trim() === '')
    ) {
      return next(new Error('Size is required for clothing category'));
    }
    next();
  });

//   middlewear for validating discount in patch
productSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    const existing = await this.model.findOne(this.getQuery());
  
    if (!existing) return next();
  
    const finalPrice = update.price ?? existing.price;
    const finalDiscount = update.discount ?? existing.discount;
  
    if (typeof finalDiscount === 'number' && finalDiscount >= finalPrice) {
      return next(new Error('Discount cannot be greater than or equal to price'));
    }
  
    next();
  });
// validate discount in post   
productSchema.pre('save', function (next) {
    if (
      typeof this.discount === 'number' &&
      typeof this.price === 'number' &&
      this.discount >= this.price
    ) {
      return next(new Error('Discount cannot be greater than or equal to price'));
    }
    next();
  });
  

  
  


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
