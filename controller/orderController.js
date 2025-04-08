const AppError = require('../Public/utils.js/appError')
const Product = require('./../model/productModel')
const APIFeatures = require('./../Public/utils.js/APIFeatures')
const catchAsync = require('./../Public/utils.js/catchAsync')
const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET 

const Order = require('./../model/orderModel')
const User = require('./../model/userModel')
const SendEmail = require('./../Public/utils.js/sendEmail')
exports.getCheckoutSession =catchAsync(async (req,res,next)=>{
    // find the product

    const product = await Product.findById(req.params.productId)

    // create the session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/api/v1/products`,
        cancel_url: `${req.protocol}://${req.get('host')}/api/v1/products`,
        customer_email: req.user.email,
        client_reference_id: req.params.productId,
        shipping_address_collection: {
            allowed_countries: ['US', 'IN', 'AU']
          },
          
        line_items: [
          {
            price_data: {
              currency: 'aud',
              unit_amount: product.price * 100,
              product_data: {
                name: `${product.name} Product`,
                description: product.description
              }
            },
            quantity: 1
          }
        ]
      });
      


    // send it to the client 

    res.status(200).json({
        status:"success",
        session
    })
})

exports.webHookCheckout = async (req, res, next) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log('❌ Stripe signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('🔥 Stripe webhook hit');
  console.log('Event Type:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const shipping = session.shipping_details?.address;
    if (!shipping) return res.status(400).send("Missing shipping address");

    const shippingLocation = {
      address: `${shipping.line1}${shipping.line2 ? ', ' + shipping.line2 : ''}`,
      city: shipping.city || 'N/A',
      state: shipping.state || 'N/A',
      postalCode: shipping.postal_code || 'N/A',
      country: shipping.country || 'N/A'
    };

    const user = await User.findOne({ email: session.customer_email });
    if (!user) return res.status(404).send("User not found");

    const order = await Order.create({
      product: session.client_reference_id,
      user: user._id,
      price: session.amount_total / 100,
      shippingLocation,
      paymentStatus: 'pending',
      deliveryStatus: 'pending'
    });

    const email = new SendEmail(user, null, null);
    await email.sendInvoicePDF(order);

    console.log('✅ Order & invoice processed successfully');
  }

  res.status(200).json({ received: true });
};



exports.getOrder= catchAsync(async(req,res,next)=>{
// 
const filter = req.user.role === 'admin'
  ? { _id: req.params.id }
  : { _id: req.params.id, user: req.user.id };
const order = await Order.findOne(filter)

 if(!order){
  return next(new AppError("no order found with this id for the user", 404))
 }

 res.status(200)
 .json({ status:"success",
  data:{
    order
  }
 })
})