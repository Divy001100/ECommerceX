const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path:path.resolve(__dirname, '../config.env')})

const Product = require('./../model/productModel')
const Review = require('./../model/reviewModel')
const User = require('./../model/userModel')
const mongoose = require('mongoose')
const fs = require('fs')





const product = JSON.parse(fs.readFileSync(`${__dirname}/product.json`, 'utf-8'));
const review = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));
const user = JSON.parse(fs.readFileSync(`${__dirname}/user.json`, 'utf-8'));

const db = process.env.DB.replace(
    '<db_password>',
    process.env.DATABASE_PASSWORD
)

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 300000 
  })

  const loadData = async function (){
    const products = await Product.create(product,
      { validateBeforeSave: false }
    )
    const reviews = await Review.create(review,
      { validateBeforeSave: false }
    )
    const Users = await User.create(user,
      { validateBeforeSave: false }
    )
    console.log("products have been imported")

    process.exit()
  }

  const deleteData = async function(){
    const products = await Product.deleteMany()
    const reviews = await Review.deleteMany()
    const users = await User.deleteMany()
    console.log("data has been deleted")
    process.exit()
  }
//   load data
if(process.argv[2]==='--import'){
    loadData()
}else{
    deleteData()
}


