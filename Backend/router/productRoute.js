const express= require('express')
const productController = require('./../controller/productController')
const authController = require('./../controller/authController')
const reviewRouter= require('./reviewRoute')
const factory = require('./../controller/handleFactory')
const ProductImageProcessor = require('./../Public/utils.js/multer/products')
const router = express.Router()


// reviews nested route
router
.use('/:productId/reviews', reviewRouter)
// aliasing top 5 prod
router.route('/top-5-cheap')
.get(authController.protect,
    productController.aliasTopProducts,
    productController.getAllProducts)
//top 5 electronics
router.route('/top-electronics')
.get(authController.protect,
    productController.aliasTopElectronics,
    productController.getAllProducts)


// aggregation stats for products

router.get('/product-stats', authController.protect,

    authController.restrictTo('admin'),
    productController.ProductStats)


router
.route('/')
.get( productController.getAllProducts)
.post(authController.protect,
    authController.restrictTo("admin","seller"),
productController.createProduct)


router.route('/:id')
.get(productController.getProduct)
.patch(authController.protect,
    authController.restrictTo('admin',"seller"),
    ProductImageProcessor.uploadProductImages,
ProductImageProcessor.resizeProductImages,
    productController.updateProduct)
.delete(authController.protect,
    authController.restrictTo('admin',"seller"),
    productController.deleteProduct)






module.exports = router