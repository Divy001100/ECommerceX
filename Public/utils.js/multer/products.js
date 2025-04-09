const multer = require('multer')
const sharp = require('sharp')
const Product = require('../../../model/productModel')



// multer
const multerStorage = multer.memoryStorage()
const multerFilter = (req,file,cb)=>{
    if(!file.mimetype.startsWith('image')){
        cb(new AppError("please upload a valid image", 400),false)
    }
    else{
        cb(null, true)
    }

}
const upload =multer({
    storage:multerStorage,
    fileFilter:multerFilter
})

exports.uploadProductImages =upload.fields([
    {name:"imageCover", maxCount:1},
    {name:"images", maxCount:10}
]) 

exports.resizeProductImages = async (req, res, next) => {
    if (!req.files) return next();
  
    // ✅ PROCESS imageCover IF present
    
    if (req.files.imageCover) {
    
     
      const filename = `product-${req.params.id}-${Date.now()}-imageCover.jpg`;
  
      await sharp(req.files.imageCover[0].buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        // .toFile(`public/img/products/cover/${filename}`);
  
      req.body.imageCover = filename;
    }
  
    // ✅ PROCESS images[] IF present
    if (req.files.images) {
      req.body.images = [];
  
      for (let i = 0; i < req.files.images.length; i++) {
       const filename = `product-${req.psrams.id}-${Date.now()}-image${i}.jpg`;
  
        await sharp(req.files.images[i].buffer)
          .resize(100, 100)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          // .toFile(`public/img/products/products/${filename}`);
  
        req.body.images.push(filename);
      }
    }
  
    next();
  };
  