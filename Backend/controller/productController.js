
const Product = require('./../model/productModel')
const catchAsync = require('./../Public/utils.js/catchAsync')
const factory = require('./handleFactory')

exports.aliasTopProducts = async (req,res,next)=>{
    if (req.query.preview === "true") {
        const products = await Product.find()
          .sort("price -ratingsAverage")
          .limit(5)
          .select("name price ratingsAverage priceinINR imageCover");
      
        return res.status(200).json({
          status: "success",
          data: {
            products
          }
        });
      }
      
    req.query.sort ="price,ratingsAverage"
    req.query.limit ="5"
    req.query.fields = 'name,price,ratingsAverage,brand'
    next()

}
exports.aliasTopElectronics = (req,res,next)=>{
    req.query.category = 'electronics',
    req.query.sort = '-ratingsAverage'
    req.query.fields ='brand,name,price,ratingsAverage,ratingsQuantity'
    next()
}








exports.getAllProducts = factory.getAll(Product)
exports.createProduct = factory.createOne(Product)
exports.getProduct = factory.getOne(Product,'reviews')
exports.updateProduct = factory.updateOne(Product)
exports.deleteProduct =factory.deleteOne(Product)

// aggreation to get the stats
exports.ProductStats = catchAsync(async(req,res,next)=>{
    const stats = await Product.aggregate([
        {
            $group:{
                _id:'$category',
            totalProducts:{$sum:1},
            avgPrice:{$avg:'$price'},
            minPrice:{$min:"$price"},
            maxPrice:{$max:'$price'},
            avgRatingNumber:{$avg:"$ratingsQuantity"},
            }
        }
    ])

    res.status(200).json({
        status:"Success",
        data:{
            stats
        }
    })
})