const mongoose = require('mongoose')
const validator = require('validator')
const { default: isEmail } = require('validator/lib/isEmail')
const { validate } = require('./productModel')
const bcrypt = require('bcrypt')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A user must have a name'],
        maxLength:[10, 'name can not be more than 20 charecters long'],
        minLength:[3,'name must be 3 charecters long']
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        validate:[validator.isEmail, 'Please provide a valid Email Address']
    },
    photo:{
        type:String,
        default:'default.jpg'
    },
    password:{
        type:String,
        required:true,
        minLength:[5,'password must be 5 charecters long'],
        select:false
        
    }, 
    passwordConfirm:{
        type:String,
        required:true,
        validate:{
            validator:function(val){
                return this.password ===val
            },
            message:"passwords are not the same"
        }
    },
    role:{
        type:String,
        enum:['user', 'admin','seller'],
        default:'user'
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpiresIn:Date,
    active:{
        type:Boolean,
        default:true, 
        select:false
    }
})


// when password change
userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    
    this.passwordChangedAt = Date.now() - 5000; // 5 seconds buffer
    next();
});

   

// doc pre to encrypt password

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

// query middlewear to hide inactive user
userSchema.pre(/^find/, function(next){
    this.find({active:!false})
    next()
})


// instance method to check password
userSchema.methods.correctPassword =async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.checkChangedPassword =  function(JWT_TIMESTAMP){
        if(this.passwordChangedAt){
           
         const changedTimeStamp = this.passwordChangedAt.getTime()/1000
          
            return JWT_TIMESTAMP<changedTimeStamp

        }
    
    return false
}

// forgot password instance method to create a reset token
// & have the hashed version
userSchema.methods.createPasswordResetToken =(function(){
   const token = crypto.randomBytes(32).toString('hex')
   this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
   this.passwordResetExpiresIn = Date.now()+10*60*1000
   return token;
})



const User = mongoose.model('User', userSchema)

module.exports = User