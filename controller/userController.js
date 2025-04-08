const catchAsync = require('../Public/utils.js/catchAsync')
const User = require('./../model/userModel')
const AppError = require('./../Public/utils.js/appError')
const factory = require('./handleFactory')



const filteredObj = (obj, ...excludedFields)=>{
    let filtered = {}
   const allowed =  Object.keys(obj).filter((key)=>{
       return !excludedFields.includes(key)
        
   })
   allowed.forEach((key)=>{
      return filtered[key]=obj[key]
  })
  
  return filtered
  }




exports.updateMe = catchAsync(async(req,res,next)=>{
console.log(req.file)
console.log(req.body)
    
    // 1 create error if user post password related data
      if(req.body.password){
       return next(new AppError("You can't reset your password here please use /updateMyPassword", 401))
      }
      if(req.file){
         req.body.photo = req.file.filename
        console.log('req.body is ', req.body.photo)
      }
     
      

      const filteredBody =filteredObj(req.body,'role')
    
    // 2 update user document
    const user = await User.findByIdAndUpdate(req.user.id, filteredBody,{
        runValidators:true,
        new:true
    })

    res.status(200).json({
        status:"success",
        message:`All the details have been updated for ${user.name}`,
        user
    })
})

exports.deleteMe = catchAsync(async(req,res,next)=>{
    // 
    await User.findByIdAndUpdate(req.user.id,{active:false})
    
     res.status(204).json({
        status:"success",
        data:null
     })
})

exports.getMe = (req,res,next)=>{
    req.params.id =req.user.id
    next()
}



exports.getAllUser =factory.getAll(User)
exports.getUser = factory.getOne(User)



exports.createUser = (req,res,next)=>{
    res.status(200).json({
        status:"success",
        message:"this route hasn't been implemented yet"
    })
}

exports.updateUser =(req,res,next)=>{
    res.status(200).json({
        status:"success",
        message:"this route hasn't been implemented yet"
    })
}

exports.deleteUser =(req,res,next)=>{
    res.status(200).json({
        status:"success",
        message:"this route hasn't been implemented yet"
    })
}