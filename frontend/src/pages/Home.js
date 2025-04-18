
import { useState, useEffect, useRef } from "react";
import { Link, useSubmit } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [topProducts, setTopProducts] = useState([]);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    async function fetchTopProducts() {
      const res = await fetch("/api/v1/products/top-5-cheap?preview=true");

      const data = await res.json();
      console.log("Fetched top products:", data); 
      setTopProducts(data.data?.products || []);
    }
    fetchTopProducts();
  }, []);

  return (
    <div className="overflow-x-hidden bg-white text-black">
      {/* Navigation */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-gray-100 to-white backdrop-blur-md border-b border-gray-200 py-4 px-8 flex justify-between items-center"
        style={{ opacity }}
      >
        <Link to="/" className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-white-500 to-blue-500">
          ECOMMERCEX
        </Link>
        <div className="flex gap-6">
          <Link to="/products" className="text-sm font-medium hover:text-blue-600 transition">Shop</Link>
          <Link to="/users/login" className="text-sm font-medium hover:text-purple-600 transition">Login</Link>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-white z-0"
          style={{ y: yBg }}
        />

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center px-6 z-10"
        >
          <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-700">
            ECOMMERCEX
          </h1>
          <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto">
            Where cutting-edge technology meets unparalleled shopping experience
          </p>
          <p>Designed and developed by Divyanshu Singh</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex gap-4 justify-center"
          >
            <Link 
              to="/products" 
              className="px-8 py-3 bg-gradient-to-r from-blue-600 via-white-200 to-blue-200 text-white rounded-full font-medium hover:shadow-xl transition-all"
            >
              Shop Now
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-3 border border-gray-800 text-gray-800 rounded-full font-medium hover:bg-gray-100 transition-all"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="py-32 px-6 md:px-24 bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-bold mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-white-200 to-blue-500"
        >
          ENGINEERED FOR EXCELLENCE
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <LuxuryFeatureCard
            icon="🚀"
            title="Top Rated Products"
            description="MongoDB aggregation powered product ranking system"
          />
          <LuxuryFeatureCard
            icon="🛡️"
            title="Military-Grade Security"
            description="XSS, HPP, NoSQL injection, CSRF protection"
          />
          <LuxuryFeatureCard
            icon="✉️"
            title="Auto-Email Invoices"
            description="Instant order confirmation with Resend/NodeMailer"
          />
          <LuxuryFeatureCard
            icon="⚡"
            title="Lightning Fast Browsing"
            description="Smart filtering, sorting & pagination"
          />
          <LuxuryFeatureCard
            icon="⭐"
            title="Verified Reviews"
            description="Purchase-verified review system with admin moderation"
          />
          <LuxuryFeatureCard
            icon="💳"
            title="Secure Payments"
            description="Stripe integration with PCI compliance"
          />
        </div>
      </section>
      {/* dashboard  */}
      <section className="relative py-32 px-6 md:px-24 bg-gradient-to-b from-white via-black to-white text-white">
  <motion.h2
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-red-500 to-orange-500"
  >
    Admin Dashboard Preview
  </motion.h2>

  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="relative w-full h-[720px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
    style={{
      background: "radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      backdropFilter: "blur(12px)"
    }}
  >
    <iframe
    src="/admin/preview-dashboard?preview=true"
      title="Admin Dashboard Preview"
      className="w-full h-full rounded-3xl"
      style={{ border: "none", backgroundColor: "transparent" }}
    />
  </motion.div>

  <p className="text-center mt-12 text-gray-400 text-lg">
    Real-time insights powered by MongoDB Aggregation. No recording — this is a live embed.
  </p>
</section>

      
      {/* dashboard */}

      {/* control pannel */}
      
      <section className="relative py-32 px-6 md:px-24 bg-gradient-to-b from-white via-white to-white text-white">
  <motion.h2
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white-500 to-yellow-500"
  >
    Admin Control Pannel
  </motion.h2>

  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="relative w-full h-[720px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
    style={{
      background: "radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      backdropFilter: "blur(12px)"
    }}
  >
    <iframe
    src="/admin/preview-control-panel?preview=true"
      title="Admin Dashboard Preview"
      className="w-full h-full rounded-3xl"
      style={{ border: "none", backgroundColor: "transparent" }}
    />
  </motion.div>

  <p className="text-center mt-12 text-gray-400 text-lg">
  Manage everything from a single place — users, products, and reviews — with real-time search, drilldowns, and live editing. This is the actual admin control panel, rendered live with full backend connectivity. No mockups. No recordings. Just pure control.  </p>
</section>
      {/* control pannel */}

      {/* Top Products Preview */}
      <section className="py-32 px-6 bg-gradient-to-b from-white-400 to-black-500">
        <motion.h2
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-bold mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-black-200"
        >
          CURATED SELECTION
        </motion.h2>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 -mx-6 px-6 no-scrollbar">
          {topProducts.map(product => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="snap-start flex-shrink-0 w-80"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-400/30 transition-all border border-gray-200">
                <img 
                  src={product.imageCover} 
                  alt={product.name} 
                  className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-blue-600 font-medium">₹{product.priceinINR}</span>
                    <span className="flex items-center text-yellow-500">
                      {"★".repeat(Math.round(product.ratingsAverage))}
                      <span className="text-gray-500 ml-1 text-sm">({product.ratingsQuantity})</span>
                    </span>
                  </div>
                  <Link 
                    to={`/products/${product._id}`}
                    className="mt-6 inline-block w-full text-center bg-gradient-to-r from-blue-600 via-white-200 to-blue-300 py-2 rounded-lg text-white font-semibold hover:shadow-lg transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
            
          ))}
          
        </div>
      </section>
      {/* CTA Section */}
<section className="relative py-40 px-6 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-white-900/30 to-red-900/30 z-0" />
  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-10" />

  <motion.div 
    className="relative z-20 max-w-4xl mx-auto text-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
  >
    <h2 className="text-5xl md:text-6xl font-extrabold mb-8">
      READY TO <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-white-200 to-blue-200">ELEVATE</span> YOUR SHOPPING?
    </h2>
    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
      Join thousands of satisfied customers experiencing the future of eCommerce today.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link 
        to="/users/signup"
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-black-400 text-white rounded-full font-bold hover:shadow-xl hover:shadow-blue-500/30 transition-all text-lg"
      >
        Create Free Account
      </Link>
      <Link 
        to="/products"
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-black-400 text-white rounded-full font-bold hover:shadow-xl hover:shadow-blue-500/30 transition-all text-lg"      >
        Browse Products
      </Link>
    </div>
  </motion.div>
</section>
{/* Footer Section */}
<footer className="bg-white border-t border-gray-200 text-gray-700 py-16 px-6 md:px-24">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
    <div>
      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-white-500 to-blue-500 mb-4">
        ECOMMERCEx
      </h3>
      <p className="text-gray-600">The future of online shopping, today.</p>
    </div>

    <div>
      <h4 className="text-lg font-semibold mb-4">Shop</h4>
      <ul className="space-y-2 text-gray-500">
        <li><Link to="/products" className="hover:text-black transition">All Products</Link></li>
        <li><Link to="/categories" className="hover:text-black transition">Categories</Link></li>
        <li><Link to="/deals" className="hover:text-black transition">Special Deals</Link></li>
      </ul>
    </div>

    <div>
      <h4 className="text-lg font-semibold mb-4">Company</h4>
      <ul className="space-y-2 text-gray-500">
        <li><Link to="/about" className="hover:text-black transition">About Us</Link></li>
        <li><Link to="/contact" className="hover:text-black transition">Contact</Link></li>
        <li><Link to="/careers" className="hover:text-black transition">Careers</Link></li>
      </ul>
    </div>

    <div>
      <h4 className="text-lg font-semibold mb-4">Legal</h4>
      <ul className="space-y-2 text-gray-500">
        <li><Link to="/privacy" className="hover:text-black transition">Privacy Policy</Link></li>
        <li><Link to="/terms" className="hover:text-black transition">Terms of Service</Link></li>
        <li><Link to="/refunds" className="hover:text-black transition">Refund Policy</Link></li>
      </ul>
    </div>
  </div>

  <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} ECOMMERCEx. All rights reserved.
  </div>
</footer>


    </div>
  );
}

function LuxuryFeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 hover:border-blue-500/30 transition-all shadow-xl"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function HomePage() {
//   const [topProducts, setTopProducts] = useState([]);
//   const { scrollYProgress } = useScroll();
//   const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

//   useEffect(() => {
//     async function fetchTopProducts() {
//       const res = await fetch("/api/v1/products/top-5-cheap");
//       const data = await res.json();
//       setTopProducts(data.data?.products || []);
//     }
//     fetchTopProducts();
//   }, []);

//   return (
//     <div className="overflow-x-hidden bg-black text-white">
//       {/* Luxury Navigation */}
//       <motion.div 
//         className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 py-4 px-8 flex justify-between items-center"
//         style={{ opacity }}
//       >
//         <Link to="/" className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
//           ECOMMERCEx
//         </Link>
//         <div className="flex gap-6">
//           <Link to="/products" className="text-sm font-medium hover:text-blue-400 transition">Shop</Link>
//           <Link to="/login" className="text-sm font-medium hover:text-purple-400 transition">Login</Link>
//         </div>
//       </motion.div>

//       {/* Cinematic Hero Section */}
//       <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
//         <motion.div 
//           className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0"
//           style={{ y: yBg }}
//         />
        
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="text-center px-6 z-10"
//         >
//           <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
//             ECOMMERCEX
//           </h1>
//           <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
//             Where cutting-edge technology meets unparalleled shopping experience
//           </p>
//           <p>Designed and developed by Divyanshu Singh</p>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="mt-12 flex gap-4 justify-center"
//           >
//             <Link 
//               to="/products" 
//               className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-xl transition-all"
//             >
//               Shop Now
//             </Link>
//             <Link 
//               to="/about" 
//               className="px-8 py-3 border border-white text-white rounded-full font-medium hover:bg-white/10 transition-all"
//             >
//               Learn More
//             </Link>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Feature Story Section - Luxury Grid */}
//       <section className="py-32 px-6 md:px-24 bg-gradient-to-b from-black to-gray-900">
//         <motion.h2
//           initial={{ opacity: 0, x: -100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           viewport={{ once: true }}
//           className="text-5xl font-bold mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
//         >
//           ENGINEERED FOR EXCELLENCE
//         </motion.h2>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
//           <LuxuryFeatureCard
//             icon="🚀"
//             title="Top Rated Products"
//             description="MongoDB aggregation powered product ranking system"
//           />
//           <LuxuryFeatureCard
//             icon="🛡️"
//             title="Military-Grade Security"
//             description="XSS, HPP, NoSQL injection, CSRF protection"
//           />
//           <LuxuryFeatureCard
//             icon="✉️"
//             title="Auto-Email Invoices"
//             description="Instant order confirmation with Resend/NodeMailer"
//           />
//           <LuxuryFeatureCard
//             icon="⚡"
//             title="Lightning Fast Browsing"
//             description="Smart filtering, sorting & pagination"
//           />
//           <LuxuryFeatureCard
//             icon="⭐"
//             title="Verified Reviews"
//             description="Purchase-verified review system with admin moderation"
//           />
//           <LuxuryFeatureCard
//             icon="💳"
//             title="Secure Payments"
//             description="Stripe integration with PCI compliance"
//           />
//         </div>
//       </section>

//       {/* Top Products - Carousel Style */}
//       <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black">
//         <motion.h2
//           initial={{ opacity: 0, x: 100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           viewport={{ once: true }}
//           className="text-5xl font-bold mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600"
//         >
//           CURATED SELECTION
//         </motion.h2>
        
//         <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 -mx-6 px-6 no-scrollbar">
//           {topProducts.map(product => (
//             <motion.div
//               key={product._id}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.7 }}
//               viewport={{ once: true, margin: "0px 0px -100px 0px" }}
//               className="snap-start flex-shrink-0 w-80"
//             >
//               <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all">
//                 <img 
//                   src={product.imageCover} 
//                   alt={product.name} 
//                   className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
//                 />
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold">{product.name}</h3>
//                   <div className="flex justify-between items-center mt-4">
//                     <span className="text-blue-400 font-medium">₹{product.priceinINR}</span>
//                     <span className="flex items-center text-yellow-400">
//                       {"★".repeat(Math.round(product.ratingsAverage))}
//                       <span className="text-gray-400 ml-1 text-sm">({product.ratingsQuantity})</span>
//                     </span>
//                   </div>
//                   <Link 
//                     to={`/products/${product._id}`}
//                     className="mt-6 inline-block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 py-2 rounded-lg hover:shadow-lg transition-all"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* admin  */}
//       <section className="py-32 px-6 md:px-24 bg-black text-white">
//   <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
//     Admin Dashboard Preview
//   </h2>

//   <div className="relative w-full h-[700px] overflow-hidden rounded-2xl shadow-2xl border border-gray-800">
//     <iframe
//       src="/admin/product-stats"
//       title="Admin Dashboard Live Preview"
//       className="w-full h-full rounded-xl"
//       style={{ border: "none" }}
//     />
//   </div>

//   <p className="text-center text-gray-400 mt-8 text-lg">
//     Experience the analytics dashboard built for next-gen eCommerce admins.
//   </p>
// </section>

//       {/* ad */}

//       {/* Ultra Premium CTA */}
//       <section className="relative py-40 px-6 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 z-0" />
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-10" />
        
//         <motion.div 
//           className="relative z-20 max-w-4xl mx-auto text-center"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-5xl md:text-6xl font-extrabold mb-8">
//             READY TO <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">ELEVATE</span> YOUR SHOPPING?
//           </h2>
//           <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
//             Join thousands of satisfied customers experiencing the future of eCommerce today.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link 
//               to="/register"
//               className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold hover:shadow-xl hover:shadow-blue-500/30 transition-all text-lg"
//             >
//               Create Free Account
//             </Link>
//             <Link 
//               to="/products"
//               className="px-8 py-4 border border-white text-white rounded-full font-bold hover:bg-white/10 transition-all text-lg"
//             >
//               Browse Products
//             </Link>
//           </div>
//         </motion.div>
//       </section>

//       {/* Luxury Footer */}
//       <footer className="bg-black border-t border-gray-800 py-12 px-6 md:px-24">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
//           <div>
//             <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
//               ECOMMERCEx
//             </h3>
//             <p className="text-gray-400">
//               The future of online shopping, today.
//             </p>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Shop</h4>
//             <ul className="space-y-2 text-gray-400">
//               <li><Link to="/products" className="hover:text-white transition">All Products</Link></li>
//               <li><Link to="/categories" className="hover:text-white transition">Categories</Link></li>
//               <li><Link to="/deals" className="hover:text-white transition">Special Deals</Link></li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Company</h4>
//             <ul className="space-y-2 text-gray-400">
//               <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
//               <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
//               <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Legal</h4>
//             <ul className="space-y-2 text-gray-400">
//               <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
//               <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
//               <li><Link to="/refunds" className="hover:text-white transition">Refund Policy</Link></li>
//             </ul>
//           </div>
//         </div>
//         <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
//           © {new Date().getFullYear()} ECOMMERCEx. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }

// function LuxuryFeatureCard({ icon, title, description }) {
//   return (
//     <motion.div
//       whileHover={{ y: -10 }}
//       className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-purple-500/30 transition-all"
//     >
//       <div className="text-4xl mb-4">{icon}</div>
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <p className="text-gray-400">{description}</p>
//     </motion.div>
//   );
// }






// // import { motion } from "framer-motion";
// // import { useEffect, useState } from "react";

// // export default function HomePage() {
// //   const [topProducts, setTopProducts] = useState([]);

// //   useEffect(() => {
// //     async function fetchTopProducts() {
// //       const res = await fetch("/api/v1/products/top-5-cheap");
// //       const data = await res.json();
// //       setTopProducts(data.data?.products || []);
// //     }
// //     fetchTopProducts();
// //   }, []);

// //   return (
// //     <div className="overflow-x-hidden">
// //       {/* Hero Section */}
// //       <section className="relative h-screen w-full flex items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white">
// //         <motion.div
// //           initial={{ opacity: 0, y: -50 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 1 }}
// //           className="text-center px-6"
// //         >
// //           <h1 className="text-6xl font-extrabold tracking-tight leading-tight">EcommerceX</h1>
// //           <p className="mt-4 text-lg text-gray-300">
// //             The next-gen eCommerce platform where performance meets security.
// //           </p>
// //         </motion.div>
// //       </section>

// //       {/* Feature Story Section */}
// //       <section className="bg-white text-black py-24 px-6 md:px-24">
// //         <motion.h2
// //           initial={{ opacity: 0, x: -100 }}
// //           whileInView={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 1 }}
// //           viewport={{ once: true }}
// //           className="text-4xl font-bold mb-12"
// //         >
// //           Built to Amaze
// //         </motion.h2>

// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           whileInView={{ opacity: 1 }}
// //           transition={{ duration: 1 }}
// //           viewport={{ once: true }}
// //           className="grid gap-12"
// //         >
// //           <FeatureBlock
// //             title="Top Rated Products"
// //             description="Using advanced MongoDB aggregation, we surface the most loved products by our customers."
// //           />
// //           <FeatureBlock
// //             title="Secure from the Ground Up"
// //             description="Protected against XSS, HPP, NoSQL injection, and CSRF using Helmet, mongo-sanitize, and more."
// //           />
// //           <FeatureBlock
// //             title="Auto-Email Invoices"
// //             description="Every order triggers a secure email invoice via Resend or NodeMailer."
// //           />
// //           <FeatureBlock
// //             title="Smart Filtering & Pagination"
// //             description="Experience lightning-fast filtering, sorting, and paginated product browsing."
// //           />
// //           <FeatureBlock
// //             title="Custom Review System"
// //             description="Only the one who buys — can review. Moderated by admin. Editable, Deletable. Fully secure."
// //           />
// //         </motion.div>
// //       </section>

// //       {/* Top Products Section */}
// //       <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 px-6 md:px-24">
// //         <motion.h2
// //           initial={{ opacity: 0, x: 100 }}
// //           whileInView={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 1 }}
// //           viewport={{ once: true }}
// //           className="text-4xl font-bold mb-12"
// //         >
// //           Top 5 Products Right Now
// //         </motion.h2>
// //         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
// //           {topProducts.map(product => (
// //             <motion.div
// //               key={product._id}
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5 }}
// //               viewport={{ once: true }}
// //               className="bg-white text-black rounded-xl overflow-hidden shadow-lg"
// //             >
// //               <img src={product.imageCover} alt={product.name} className="w-full h-60 object-cover" />
// //               <div className="p-6">
// //                 <h3 className="text-xl font-bold">{product.name}</h3>
// //                 <p className="text-gray-600">Price: ₹{product.priceinINR}</p>
// //                 <p className="text-sm mt-2 text-gray-500">⭐ {product.ratingsAverage} / 5</p>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Call to Action */}
// //       <section className="bg-black text-white py-20 px-6 md:px-24 text-center">
// //         <motion.h2
// //           initial={{ opacity: 0, scale: 0.95 }}
// //           whileInView={{ opacity: 1, scale: 1 }}
// //           transition={{ duration: 0.7 }}
// //           viewport={{ once: true }}
// //           className="text-4xl font-extrabold"
// //         >
// //           Ready to experience EcommerceX?
// //         </motion.h2>
// //         <p className="mt-4 text-gray-400">Sign up now and redefine how you shop online.</p>
// //       </section>
// //     </div>
// //   );
// // }

// // function FeatureBlock({ title, description }) {
// //   return (
// //     <div>
// //       <h3 className="text-2xl font-semibold mb-2">{title}</h3>
// //       <p className="text-gray-700">{description}</p>
// //     </div>
// //   );
// // }
