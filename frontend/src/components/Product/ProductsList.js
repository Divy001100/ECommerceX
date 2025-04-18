import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductFilterBar from "./ProductFilterBar";
import PaginationControl from "./PaginationControl";

// Color style mapping
const getColorStyle = (color) => {
  const colorMap = {
    black: { bg: 'bg-black', text: 'text-white' },
    white: { bg: 'bg-gray-200', text: 'text-black' },
    red: { bg: 'bg-red-600', text: 'text-white' },
    blue: { bg: 'bg-blue-600', text: 'text-white' },
    green: { bg: 'bg-green-600', text: 'text-white' },
    yellow: { bg: 'bg-yellow-400', text: 'text-black' },
    pink: { bg: 'bg-pink-500', text: 'text-white' },
    orange: { bg: 'bg-orange-500', text: 'text-white' },
    purple: { bg: 'bg-purple-600', text: 'text-white' }
  };
  return colorMap[color?.toLowerCase()] || { bg: 'bg-blue-500', text: 'text-white' };
};

function ProductsList({ products }) {
  return (
    <div className="max-w-8xl mx-auto px-4 py-12 bg-gradient-to-b from-gray-200 via-gray-600 to-white">
 {/* <div className="w-full bg-[#0f0f0f] border-b border-white/10 py-2 px-4 mb-8">
    <ProductFilterBar products={products} />
  </div> */}

<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="w-full bg-[#0f0f0f] border-y border-white/10 py-3 px-6 flex flex-wrap justify-center gap-6 mb-6"
>
  <ProductFilterBar products={products} />
</motion.div>





     
     
     
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
          }
        }}
      >
        {products.map((product) => {
          const colorStyle = getColorStyle(product.color);

          return (
            <motion.div
              key={product._id}
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-800/5 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-[1.02]"></div>
              
              <Link 
                to={`/products/${product._id}`} 
                className="relative block h-full bg-white rounded-3xl overflow-hidden border border-gray-100 group-hover:border-blue-300/30 transition-all duration-300"
              >
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                  <img
                    src={product.imageCover}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                    <span className="font-bold text-blue-700">
                      ₹{product.price}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-black truncate pr-2">
                      {product.name}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white-800">
                      {product.brand}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {product.size && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                        Size: {product.size}
                      </span>
                    )}
                    {product.color && (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorStyle.bg} ${colorStyle.text}`}>
                        {product.color}
                      </span>
                    )}
                    {product.gender && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-white">
                        {product.gender}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
      <PaginationControl totalItems={100} />

    </div>
  );
}

export default ProductsList;
















// function ProductsList({ products }) {
//   return (
//     <div className="max-w-8xl mx-auto px-6 py-16">
//       {/* Animated grid container */}
//       <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//         {products.map((product) => (
//           <li
//             key={product._id}
//             className="group relative bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-glow hover:border-white/20 hover:-translate-y-2"
//           >
//             {/* Hover shine effect */}
//             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//               <div className="absolute top-0 left-0 w-48 h-48 -ml-24 -mt-24 bg-gradient-to-r from-indigo-500/20 via-transparent to-transparent transform rotate-45 origin-center"></div>
//             </div>

//             <Link to={`/products/${product._id}`} className="block h-full">
//               {/* Image with parallax effect */}
//               <div className="relative h-80 overflow-hidden">
//                 <img
//                   src={product.imageCover}
//                   alt={product.name}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 {/* Floating price tag */}
//                 <span className="absolute top-4 right-4 bg-black/80 text-green-400 px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
//                   ${product.price}
//                 </span>
//               </div>

//               {/* Product info */}
//               <div className="p-6 relative z-10">
//                 <div className="flex justify-between items-start">
//                   <h2 className="text-xl font-bold text-white truncate pr-2">
//                     {product.name}
//                   </h2>
//                   <span className="text-xs text-white/100 bg-white/10 px-2 py-1 rounded-full">
//                     {product.brand}
//                   </span>
//                 </div>

//                 <p className="text-white/70 mt-2 text-sm line-clamp-2 min-h-[40px]">
//                   {product.description}
//                 </p>

//                 {/* Spec pills */}
//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {product.size && (
//                     <span className="text-xs bg-indigo-900/50 text-indigo-300 px-2.5 py-1 rounded-full">
//                       {product.size}
//                     </span>
//                   )}
//                   {product.color && (
//                     <span className="text-xs bg-blue-900/50 text--300 px-2.5 py-1 rounded-full">
//                       {product.color}
//                     </span>
//                   )}
                 
//                        {product.gender && (
//                     <span className="text-xs bg-amber-900/50 text-amber-300 px-2.5 py-1 rounded-full">
//                       {product.gender}
//                     </span>
//                   )}
//                 </div>

//                 {/* Hidden hover details */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
//                   <button className="w-full bg-white text-black py-2 rounded-full font-bold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProductsList;


























// import { Link } from "react-router-dom";

// function ProductsList({ products }) {
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//         {products.map((product) => (
//           <li
//             key={product._id}
//             className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl"
//           >
//             <Link to={`/products/${product._id}`} className="block">
//               <img
//                 src={product.imageCover}
//                 alt={product.name}
//                 className="w-full h-52 object-cover rounded-xl mb-4"
//               />
//               <h2 className="text-xl font-bold text-white truncate">{product.name}</h2>
//               <p className="text-green-400 text-lg font-semibold">${product.price}</p>
//               <p className="text-gray-300 text-sm mt-1 line-clamp-2">{product.description}</p>
//               <div className="text-sm text-gray-400 mt-3 space-y-1">
//                 <p>Brand: {product.brand}</p>
//                 {product.size && <p>Size: {product.size}</p>}
//                 {product.color && <p>Color: {product.color}</p>}
//               </div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProductsList;
























// import { Link } from "react-router";

// function ProductsList({ products }) {
   
  
//     return (<div>
//       <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto p-4">

//   {products.map((product) => (
    
//     <li key={product.id} className="bg-white text-black rounded shadow p-4">
//       <Link to={product.id}>
//       <img src={product.imageCover} alt={product.name} className="w-full h-48 object-cover rounded" />
//       <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
//       <p className="text-lg font-bold text-green-600">${product.price}</p>
//       <p className="text-sm text-gray-700">{product.description}</p>
//       <div className="text-sm mt-2">
//         <span className="mr-2">Brand: {product.brand}</span>
//         <span className="mr-2">Size: {product.size}</span>
//         <span>Color: {product.color}</span>
        
//       </div>
//       </Link>
//     </li>
//   ))}
// </ul>

//     </div>
//     );
//   }
  
// export default ProductsList