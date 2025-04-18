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
// router.route('/top-5-cheap')
// .get(authController.protect,
//     productController.aliasTopProducts,
//     productController.getAllProducts)

router.route("/top-5-cheap").get((req, res, next) => {
    if (req.query.preview === "true") {
      return productController.aliasTopProducts(req, res, () =>
        productController.getAllProducts(req, res, next)
      );
    }
  
    authController.protect(req, res, () => {
      productController.aliasTopProducts(req, res, () =>
        productController.getAllProducts(req, res, next)
      );
    });
  });
  
//top 5 electronics
router.route('/top-electronics')
.get(authController.protect,
    productController.aliasTopElectronics,
    productController.getAllProducts)


// aggregation stats for products

// router.get('/product-stats', authController.protect,

//     authController.restrictTo('admin'),
//     productController.ProductStats)
router.route("/product-stats").get((req, res, next) => {
    // Allow unauthenticated access for preview mode
    if (req.query.preview === "true") {
      return productController.ProductStats(req, res, next);
    }
  
    // Otherwise protect it
    authController.protect(req, res, () => {
      productController.ProductStats(req, res, next);
    });
  });
  

router
.route('/')
.get( productController.getAllProducts)
.post(
    authController.protect,
    authController.restrictTo("admin","seller"),
productController.createProduct)


router.route('/:id')
.get(productController.getProduct)
.patch(
    authController.protect,
    authController.restrictTo('admin',"seller"),
//     ProductImageProcessor.uploadProductImages,
// ProductImageProcessor.resizeProductImages,
    productController.updateProduct)
.delete(
    // TEMP: Commented out auth for testing delete route locally

    authController.protect,
    authController.restrictTo('admin',"seller"),
    productController.deleteProduct)






module.exports = router