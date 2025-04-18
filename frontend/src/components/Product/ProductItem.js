




import { useState, useEffect, useRef } from "react";
import { Link, useSubmit } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

function ProductItem({ product }) {
  
  const user = JSON.parse(localStorage.getItem("user"));
console.log("the role is ",user?.role)
  console.log(product)
  const submit = useSubmit();
  const containerRef = useRef(null);

  const allImages = [product.imageCover, ...(product.images || [])];
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalImgIndex, setModalImgIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCoverIndex((prev) => (prev + 1) % allImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [allImages.length]);

  const openModal = (images, index) => {
    setModalImages(images);
    setModalImgIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const nextImage = () => setModalImgIndex((modalImgIndex + 1) % modalImages.length);
  const prevImage = () => setModalImgIndex((modalImgIndex - 1 + modalImages.length) % modalImages.length);

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      submit(null, { method: "DELETE" });
    }
  };

  return (
    <div ref={containerRef} className="bg-white text-black overflow-hidden relative">
    

      {/* HERO SLIDESHOW */}
      <motion.section className="relative h-[120vh] flex items-end pb-32 px-8 md:px-16 lg:px-24 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/30 to-white/80 z-1" />
        
        <AnimatePresence mode="wait">
          <motion.img
            key={allImages[currentCoverIndex]}
            src={allImages[currentCoverIndex]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Hero content */}
        <motion.div 
          className="relative z-10 max-w-5xl"
          style={{ y: yText }}
        >
          <motion.span 
            className="text-indigo-600 font-mono tracking-widest text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            EXCLUSIVE COLLECTION
          </motion.span>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mt-2 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            {product.name.split(' ').map((word, i) => (
              <motion.span 
                key={i}
                className="block"
                whileHover={{ color: "#4f46e5" }}
                transition={{ duration: 0.3 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div 
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
             
                <Link 
              to={`/order/checkout-session/${product._id}`}
              className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-900 transition-all hover:shadow-xl"
            >
              Buy Now 
            </Link>
            
            
            
            {user?.role === "user" && (
              <Link 
                to={`/products/${product._id}/reviews`}
                className="border-2 border-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all"
              >
                ADD REVIEW
              </Link>
            )}
            
            {(user?.role === "admin" || (user?._id && product.user?._id && user._id === product.user._id)) && (
              <button 
                onClick={handleDeleteClick}
                className="bg-gradient-to-r from-blue-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold shadow hover:opacity-90 transition"
                >
                DELETE PRODUCT
              </button>
            )}

          {(user?.role === "admin" || (user?._id && product.user?._id && user._id === product.user._id)) && (

                  <Link
                    to={`/products/${product._id}/edit`}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold shadow hover:opacity-90 transition"
                  >
                    EDIT PRODUCT
                  </Link>
              )}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* PRODUCT DETAILS */}
      <section className="px-8 md:px-16 lg:px-24 py-32 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Specs */}
          
          <motion.div
  className="w-full"
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
>
  <h3 className="text-3xl font-bold mb-10 text-center">
     More about {product.brand}{ product.name}
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { label: "Brand", value: product.brand },
      { label: "Size", value: product.size },
      { label: "Gender", value: product.gender },
      { label: "Category", value: product.category },
      { label: "Price", value: `$${product.price} (₹${product.priceinINR})` },
      {
        label: "Rating",
        value: (
          <span className="flex items-center gap-2">
            <span className="text-yellow-300">{"★".repeat(Math.round(product.ratingsAverage))}</span>
            {product.ratingsAverage.toFixed(1)} ({product.ratingsQuantity} reviews)
          </span>
        ),
      },
    ].map((item, i) => (
      <div
        key={i}
        className="rounded-xl text-white p-6 bg-gradient-to-r from-blue-500 to-black-500 shadow-lg flex flex-col justify-center"
      >
        <p className="text-sm opacity-90 uppercase tracking-wider">{item.label}</p>
        <p className="text-xl font-bold mt-1">{item.value}</p>
      </div>
    ))}
  </div>
</motion.div>


               <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative rounded-3xl p-10 md:p-16 bg-gradient-to-br from-blue-600 via-blue-500 to-black-500 shadow-xl overflow-hidden text-white"
              >
                {/* Decorative overlay texture or fade if needed */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl z-0" />

                <div className="relative z-10">
                  <h3 className="text-4xl md:text-5xl font-extrabold italic mb-8 tracking-tight text-center text-white drop-shadow-xl">
                    Seller's Description
                  </h3>

                  <p className="text-xl md:text-2xl leading-relaxed font-cursive tracking-wide text-center md:text-justify max-w-4xl mx-auto">
                    {product.description}
                  </p>
                </div>
              </motion.div>




        </div>
      </section>

      {/* IMAGE GALLERY */}
      {/* IMAGE GALLERY */}
{product.images?.length > 0 && (
  <section className="px-8 md:px-16 lg:px-24 py-32 bg-black-transparent">
    <motion.h2
      className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-500 to-black-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      GALLERY
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {allImages.map((img, i) => (
        <motion.div
          key={i}
          className="group relative overflow-hidden rounded-2xl aspect-square shadow-lg border bg-black border-gray-200"
          whileHover={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.1 }}
        >
          <button
            type="button"
            onClick={() => openModal(allImages, i)}
            className="w-full h-full"
          >
            <img
              src={img}
              alt={`Product ${i}`}
              className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-lg font-semibold tracking-wide">
                Click to Zoom
              </span>
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  </section>
)}
      

      {/* REVIEWS */}
      {/* REVIEWS */}
{product.reviews?.length > 0 && (
  <section className="px-8 md:px-16 lg:px-24 py-32 bg-white">
    <motion.div
      className="max-w-6xl mx-auto px-6 sm:px-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500">
        {product.reviews.length} Customers Rated This Product
      </h2>
      <p className="text-center text-lg text-gray-600 mb-20 max-w-2xl mx-auto">
        Real experiences from people who bought it — explore what they had to say.
      </p>

      <div className="space-y-20">
        {product.reviews.map((review, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-2xl p-8 md:p-10 border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-6">
              <img
                src={review.user.photo}
                alt={review.user.name}
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
              <div className="flex-1">
                <div className="flex justify-between flex-wrap mb-4">
                  <h4 className="font-semibold text-xl">{review.user.name}</h4>
                  <div className="flex items-center gap-1 text-yellow-400 text-lg">
                    {"★".repeat(review.rating)}
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed italic">
                  “{review.review}”
                </p>

                {/* Review Images */}
                {review.images?.filter(img => img.trim()).length > 0 && (
                  <div className="flex gap-4 flex-wrap mt-6">
                    {review.images.map((img, j) => (
                      <motion.img
                        key={j}
                        src={img}
                        alt={`Review ${j}`}
                        onClick={() => openModal(review.images, j)}
                        className="h-24 w-24 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
                        whileHover={{ scale: 1.05 }}
                        onError={(e) => (e.target.style.display = 'none')}
                      />
                    ))}
                  </div>
                )}

                {(user?.role === 'admin' || user?._id === review.user._id) && (
                  <Link
                    to={`/products/${product._id}/reviews/${review._id}`}
                    className="inline-block mt-6 text-sm text-indigo-600 hover:underline"
                  >
                    Edit Your Review
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
)}


     

      {/* CTA SECTION */}
      <section className="px-8 md:px-16 lg:px-24 py-32 bg-black text-white text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">READY TO MAKE IT YOURS?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Limited quantities available. Secure yours before it's gone forever.
          </p>
          <Link 
            to={`/order/checkout-session/${product._id}`}
            className="inline-block bg-white text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors hover:shadow-lg"
          >
            COMPLETE PURCHASE — ${product.price}
          </Link>
        </motion.div>
      </section>

      {/* MODAL LIGHTBOX */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="relative w-full max-w-6xl h-[90vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={modalImages[modalImgIndex]} 
                className="w-full h-full object-contain rounded-lg"
              />
              
              <button 
                onClick={prevImage}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md"
              >
                ‹
              </button>
              <button 
                onClick={nextImage}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md"
              >
                ›
              </button>
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md text-2xl"
              >
                ×
              </button>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {modalImgIndex + 1} / {modalImages.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
          
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductItem;
// import { Link, useSubmit } from "react-router-dom";

// function ProductItem({ product }) {
//   const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user
//   const submit = useSubmit();
 
//   console.log(user.role)
//   const handleDeleteClick = () => {
//     const check = window.confirm("Are you sure you want to delete this product?");
//     if (check) {
//       submit(null, { method: "DELETE" }); // Trigger DELETE request for product
//     }
//   };

//   return (
//     <article className="product-item">
//       <div className="product-image">
//         <img src={product.imageCover} alt={product.name} />
//       </div>

//       {product.images && product.images.length > 0 && (
//         <div className="product-gallery">
//           {product.images.map((image, index) => (
//             <img key={index} src={image} alt={`Product Image ${index}`} />
//           ))}
//         </div>
//       )}

//       <div className="product-details">
//         <h2>{product.brand} - {product.name}</h2>
//         <p>Brand: {product.brand}</p>
//         <p>Size: {product.size}, {product.gender}</p>
//         <p>Category: {product.category}</p>
//         <p>Price: {product.price}</p>
//         <p>Price in INR: {product.priceinINR}</p>
//         <p>Description: {product.description}</p>
//         <p>Average Rating: {product.ratingsAverage}</p>
//         <p>{product.ratingsQuantity} people have rated this product</p>
             


//         {user?.role==='user' && (
//             <Link to={`/products/${product._id}/reviews`} className="add-review-link">
//               Add Review
//             </Link>
//           )}
//           <div>
//           <Link to={`/order/checkout-session/${product._id}`} className="buy-now-button">
//               Buy Now
//             </Link>
//             </div>

//         <h3>Reviews:</h3>
//         {/* Check if the user is logged in */}
          
//         {product.reviews?.map((review, index) => (
//           <div key={index} className="review-item">
//             <div className="review-user">
//               <img src={review.user.photo} alt={`${review.user.name}'s photo`} />
//               <span>{review.user.name}</span>
//             </div>
//             <div className="review-content">
//               <p>Rating: {review.rating}</p>
//               <p>{review.review}</p>

//               {review.images?.filter(img => img?.trim() !== '').length > 0 && (
//                 <div className="review-images">
//                   {review.images
//                     .filter(img => img?.trim() !== '')
//                     .map((image, imgIndex) => (
//                       <img
//                         key={imgIndex}
//                         src={image}
//                         alt={`Review Image ${imgIndex}`}
//                         className="review-image"
//                         onError={(e) => e.target.style.display = 'none'} // Hide broken images
//                       />
//                     ))}
//                 </div>
//               )}

//               {(user?.role === 'admin' || user?._id === review.user._id) && (
//                 <Link 
//                   to={`/products/${product._id}/reviews/${review._id}`}
//                   className="edit-review-link"
//                 >
//                   Edit your review
//                 </Link>
//               )}
//             </div>
//           </div>
//         ))}

//         {/* Delete Button for Product (visible only for admin or seller) */}
//         {(user?.role === "admin" || user?._id === product.user?._id) && (
//           <button
//             onClick={handleDeleteClick}
//             className="delete-product-button"
//           >
//             Delete Product
//           </button>
//         )}
//       </div>
//     </article>
//   );
// }

// export default ProductItem;
