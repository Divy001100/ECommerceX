// Modified ProductCard.jsx to match the visual from the image
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ product,preview }) {
  const navigate = useNavigate();

  const handleEdit = () => { 
    if (preview) {
      return window.confirm("You are not an admin, these feautres are for view only")
    }
    else{
       navigate(`/products/${product._id}/edit`);
    }
   

  } 
  const handleViewReviews = () => {
    if (preview){
      
      return window.confirm("You are not an admin, these feautres are for view only")
      
    }

    navigate(`/products/${product._id}#reviews`);
  }

  return (
    <div className="bg-[#0f0f0f] border border-white/10 rounded-xl px-6 py-4 shadow flex flex-col space-y-2 w-full">
      {/* ID and Name */}
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm">ID: {product._id.slice(-6)}</span>
        <span className="text-white text-base font-semibold">{product.name}</span>
      </div>

      {/* Price and Ratings */}
      <div className="flex justify-between items-center">
        <span className="text-white font-bold">₹{product.priceinINR?.toFixed(2)}</span>
        <span className="text-gray-400 text-sm">
          {product.ratingsQuantity ?? 0} reviews
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={handleViewReviews}
          className="bg-black border border-white/20 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-white hover:text-black transition"
        >
          View Reviews
        </button>
        <button
          onClick={handleEdit}
          className="bg-white text-black text-sm px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Edit Product
        </button>
      </div>
    </div>
  );
}
