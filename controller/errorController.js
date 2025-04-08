const AppError = require('./../Public/utils.js/appError')

// to make cast error isoperation true
const handleCastErrorDB =err=>{
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400)

}

// to work around duplicate DB keys and pass in isoperation customs message
const handleduplicateFieldsDB =err=>{
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
    const message = `Duplicate filed value :${value} please use another value`
     return new AppError(message, 400)

}

// DBVALIDATION ERROR
const handleValidationErrorDB= err=>{
const errors =Object.values(err.errors).map(el=>el.message)
const message =`invalid input Data, ${errors.join('. ')}`
return new AppError(message,400)


}
// JWT handler
const handleJWTError =err=>{
    return new AppError("Invalid token, Please login again", 401)
}

// function to handle error for dev env
const sendErrorDev =(err,res)=>{
    
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
       
        message:err.message ||"something went wrong",
        stack:err.stack
        
    })
}
// function to send error on prod
const sendErrorProd = (err,res)=>{
    // send operation error -APPErro class something which we make
    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message ||"something went wrong",
           
            
        })
        // unknow Error; need to stop leaking erro or info to the client
    }else{
        // Log the error
         console.error('Erro', err)
        // 2 send the generic message
        res.status(500).json({
            status:'error',
            message:'something went very wrong'
        })
    }
   
}





module.exports =(err,req,res,next)=>{
    // console.log(err.stack)
    err.statusCode =err.statusCode || 500
    err.status = err.status||"error";


    if(process.env.NODE_ENV ==='development'){
        sendErrorDev(err,res)
    } 
    else if (process.env.NODE_ENV === 'production') {
        let error =Object.create(err);
        error.message = err.message;
      
        if (error.name === 'CastError') {
          error = handleCastErrorDB(error);
        }
        if(error.code ===11000){
            error = handleduplicateFieldsDB(error)
        }
        if(error.name ==='ValidationError'){
            error = handleValidationErrorDB(error)   
        }
        if(error.name ==='JsonWebTokenError'){
            error = handleJWTError(error)
        }
      
        sendErrorProd(error, res); // ✅ Always send response, after transforming
      }
      
      }
    
    
    


// global middlewear which is catching err from next(err)
// everywhere in the app