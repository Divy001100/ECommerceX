
const AppError = require('../Public/utils.js/appError')
const Product = require('./../model/productModel')
const APIFeatures = require('./../Public/utils.js/APIFeatures')
const catchAsync = require('./../Public/utils.js/catchAsync')



exports.getAll = Model=>
    catchAsync(async(req,res,next)=>{ 
    let filter={}
    if (req.params.productId){
         filter={product:req.params.productId}
   }
  

   
    const features =  new APIFeatures(req.query, Model.find(filter))
    .filter()
    .sort()
    .select()
    .pagination()

  
     doc = await features.query

    res.status(200)
    .json({
        status:"success",
        data:{
            doc
        }
    })

})

// getOne

exports.getOne =(Model, popOptions) =>catchAsync(async(req,res,next)=>{
    const doc = await Model.findById(req.params.id)
    .populate(popOptions)

    if (!doc){
     return next(new AppError(`NO documents found with this ID`, 404))
    }
    res.status(200).json({
        data:{
            doc
        }
    })
})

// create A Document




exports.createOne = Model=>catchAsync(async(req,res,next)=>{
    
  
    // /product login=user, product =productid nested routes
    if(!req.body.product){
        req.body.product = req.params.productId }
    if(!req.body.user){
    req.body.user= req.user.id
            }
            
   
    // const product =Product.create
        const doc = await Model.create(req.body)
        res.status(200).json({
            data:{
                doc
            }
        })
        })
    

 const filteredObj = (obj, ...excludedFields)=>{
  let filtered = {}
    const allowed =  Object.keys(obj).filter((key)=>{
     return !excludedFields.includes(key)})
   allowed.forEach((key)=>{
    return filtered[key]=obj[key] })
    return filtered}       

exports.updateOne =Model=>catchAsync(async(req,res,next)=>{
    // if(!req.body.imageCover){
    //     console.log("noimagecover")
    // }
    const editableFields = filteredObj(req.body,'createdAt',"ratingsAverage","ratingsQuantity" )
       const doc = await Model.findByIdAndUpdate(req.params.id, editableFields,{
        runValidators:true,
        new:true
       })
       if (!doc){
        return next(new AppError('NO document found with this ID', 404))
       }
   res.status(200).json({
       status:"success",
       data:{
        doc
       }
   })      
})

exports.deleteOne =Model=>catchAsync(async(req,res,next)=>{
    
    const doc = await Model.findByIdAndUpdate(req.params.id,)
           if (!doc){
            return next(new AppError('NO doc found with this ID', 404))
          } res.status(200)
          .json({
           status:"success",
           message:`documenthas been deleted`,
           data:null
          })
   })

