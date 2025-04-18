const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const mongoSantize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const limiter =require('./Public/utils.js/limiter/generalLimiter')
const productRouter = require('./router/productRoute')
const userRouter = require('./router/UserRouter')
const reviewRouter = require('./router/reviewRoute')
const orderRouter = require('./router/orderRoute')
const orderController = require('./controller/orderController')
const cors = require('cors')
const path = require('path');

const AppError = require('./Public/utils.js/appError')
const globalErrorHnadler = require('./controller/errorController')


// start express app
const app = express()
// GLOBAL MIDDLEWEAR 

  
app.use(cors({
    origin: 'https://ecommercex-1.onrender.com', //  real frontend URL
    credentials: true
  }));

  console.log("🔥 CORS is set for https://ecommercex-1.onrender.com");

// webhook
app.post(
    '/webhook-checkout',
    express.raw({ type: 'application/json' }), // Only for Stripe
   orderController.webHookCheckout
  );

// HELMET - SECURE HTTP HEADERS
app.use(helmet())
// req.body parser
app.use(express.json())

// mangoSantize to stop sql injection - santizing data by removing $.sign from req.query, params,body
app.use(mongoSantize())

// xss attachk protector, stopping attacker to send html+js code
app.use(xss())



// rate-limiter for genral resources
app.use('/api', limiter)

// prevent param pollution-duplicate values from querystring
app.use(hpp({
    whitelist:['stock',"price","ratingsQuantity","size","gender","color",]
}))





// use morgan for dev
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
 
}

// compress the text send to the cleint 
app.use(compression())


app.set('trust proxy', 1); // or true




// router middlewear
app.use('/api/v1/products',productRouter)
app.use('/api/v1/users',userRouter )
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/order', orderRouter)
// middlewear if router error not catched by above two routerhandler
// .all for all methods,*for all the routes


app.all('*',(req,res,next)=>{
   next(new AppError(`can't find ${req.originalUrl}
    on this server
    please see our products at 
    ${req.protocol}://${req.get('host')}/api/v1/products`,404))
})

app.use(globalErrorHnadler)





module.exports = app;