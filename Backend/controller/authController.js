const AppError = require('../Public/utils.js/appError')
const catchAsync = require('../Public/utils.js/catchAsync')
const User = require('./../model/userModel')
const JWT = require('jsonwebtoken')
const sendEmail = require('./../Public/utils.js/email')
const SendEmail = require('./..//Public/utils.js/sendEmail')
const crypto = require('crypto')

// token function
const signToken = id=>{
    return JWT.sign({id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}


const createSendToken = (user,statusCode,res)=>{
const token = signToken(user._id)
const cookieOptions = {
expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN
*24*60*60*1000),
httpOnly: true
}
if(process.env.NODE_ENV ==='production'){
    cookieOptions.secure=true
}


res.cookie('jwt',token,cookieOptions)

res.status(statusCode).json({
    status:"success",
    token, 
    data:{
        user
    }
})

}


exports.signUp =catchAsync(async(req,res,next)=>{
const newUser = await User.create(req.body)

// newUser.password=undefined
newUser.password=undefined
newUser.passwordConfirm = undefined
 
createSendToken(newUser,201, res)
})

exports.logIn = catchAsync(async(req,res,next)=>{
    const{email,password}=req.body
    //check if user provider the username and password
  if (!email && !password){
    next(new AppError("please provide email and password", 400))
  }
    // 2 check if user exist in db? and password is correct?
    const user = await User.findOne({email}).select("+password")
//    check password is correct?
const correct = await user.correctPassword(password, user.password)
if(!user || !correct){
    next(new AppError("Incorrect email and password", 400))
}
    
    // 3 send the token   
   createSendToken(user,201,res)   
}
)

exports.protect = catchAsync(async (req,res,next)=>{
// check if token exist 
let token;
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token = req.headers.authorization.split(' ')[1]
    
}
if(!token){
    return next(new AppError("You are not logged in, please login to continue", 401))
}
// catify the token
const decoded = JWT.verify(token,process.env.JWT_SECRET)
// 3 check if user exist from the token
const user = await User.findById(decoded.id)
if (!user){
   return next(new AppError("invalid token", 404))
}
// 4 check if password was changed aftetr the token was issued
if(user.checkChangedPassword(decoded.iat)){
   
   return next(new AppError("User recently changed the password, please login again", 401)) 
}
// grant access to protected route
req.user = user

next()

})

exports.restrictTo=(...allowedRoles)=>{
    return (req,res,next)=>{
      if(!allowedRoles.includes(req.user.role)){
        next(new AppError(`You do not have permission to perform this action! `, 403))
      }
      next()
    }
}

exports.forgotPassword = catchAsync(async(req,res,next)=>{
  
    // 1 get user based on provided email
    const {email}= req.body
    const user = await User.findOne({email})
    if(!user){
     next (new AppError(`${email} is not a valid email`, 400))
    }
    
    // 2generate a random token
    resetToken =await user.createPasswordResetToken()
    await user.save({validateBeforeSave:false})
    // generate a link to take the user in resetPassword
    const resetURL = process.env.FRONTEND_URL + `/users/resetPassword/${resetToken}`;
    // 3 send it back to the user's email

    //    await sendEmail({
      
    //     email:user.email,
    //     subject:'Password reset token valid for 10 Minutes',
    //     message:`Hi ${user.name}
    //     Please reset your password by clicking the link below -${this.link}`
    //    } )
       const sendmail =new SendEmail(user, resetToken, resetLink)
       await sendmail.sendResetEmail()

     res.status(200).json({
        status:"success",
        resetLink,
        resetToken
     })
})

// reset password

exports.resetPassword= catchAsync(async(req,res,next)=>{
    // get user based on the token
     const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    //  console.log(hashedToken, 'watch me now')
     
     const user = await User.findOne({passwordResetToken:hashedToken,
        passwordResetExpiresIn:{$gt:Date.now()}
     })
    if (!user){
        next(new AppError("Token is invalid or expired", 401))
    }

    
    

    // if token hasnt expired set the password
       
    // update the password
    const {password, passwordConfirm}=req.body
    user.password =password
    user.passwordConfirm = passwordConfirm
    user.passwordResetToken = undefined;
    user.passwordResetExpiresIn = undefined
   await user.save({validateBeforeSave:true})
    // send jwt to signin
    const token =signToken(user._id)

    res.status(200).json({
        status:"success",
        token,
        message:"password has been changed"
    })
})
// update password if logged in

exports.updatePassword = catchAsync(async(req,res,next)=>{
    // 1get user from the collection
    if(!req.user.id){
        return next(new AppError("please login to update your password", 401))
    }
    const user = await User.findById(req.user.id).select('+password')
     if(!user){
        return next(new AppError("no user found", 400))
     }
    // 2check if posted password is correct
      const correct =await user.correctPassword(req.body.currentPassword,user.password)
    // 3 if so, update the password
      if (!correct){
        return next(new AppError("password is not correct", 401))
      }
      user.password = req.body.password,
      user.passwordConfirm = req.body.passwordConfirm
      await user.save()
    // 4log the uswr in 
    const token = signToken(user._id)
    res.status(200).json({
        status:"success",
        token,
        message:"password has been changed"
    })
})  