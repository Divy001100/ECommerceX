const multer = require('multer')
const sharp = require('sharp')

const multerStorage = multer.memoryStorage()
const multerFilter =(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
     cb(null,true)
    }else{
        cb(new AppError("please upload a valid image file", 400),false)
    }
}

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
})

exports.uploadUserPhoto =upload.single('photo')


exports.resizeUserPhoto =(req,res,next)=>{
    req.file.filename = `$user-${req.user.id}-${Date.now()}.jpeg`
 if(!req.file.buffer){
    return(next())
 }
 sharp(req.file.buffer)
 .toFormat('jpeg')
 .jpeg({quality:90})
//  .toFile(`public/img/users/${req.file.filename}`)
 next()
}