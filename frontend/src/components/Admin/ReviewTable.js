import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ReviewTable({ reviews = [],preview }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-black  border-collapse text-sm text-left">
        <thead>
          <tr className="text-gray-400 border-b border-white/10">
            <th className="px-4 py-3 font-medium">User</th>
            <th className="px-4 py-3 font-medium">Review</th>
            <th className="px-4 py-3 font-medium">Rating</th>
            <th className="px-4 py-3 font-medium">Product ID</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, idx) => (
            <motion.tr
              key={review._id || idx}
              className="border-b border-white/5 hover:bg-white/5 transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              <td className="px-4 py-4 whitespace-nowrap flex items-center gap-2">
                <img
                  src={`/img/users/${review.user.photo}`}
                  alt={review.user.name}
                  className="w-8 h-8 rounded-full object-cover border border-white/10"
                />
                <span>{review.user.name}</span>
              </td>
              <td className="px-4 py-4 max-w-[300px] truncate text-gray-300">
                {review.review}
              </td>
              <td className="px-4 py-4 text-yellow-400 font-semibold">
                {"★".repeat(review.rating)}
              </td>
              <td className="px-4 py-4 text-blue-300">
                {review.product.slice(-6)}
              </td>
              <td className="px-4 py-4 text-gray-500">
                {new Date(review.createAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 text-right">
                <button
                  onClick={() => {
                    if (preview) {
                      return window.confirm("You are not an admin, these feautres are for view only")
                    }
                    navigate(`/products/${review.product}/reviews/${review._id}`)
                  }}
                  className="text-indigo-400 hover:text-indigo-200 text-xs mr-3"
                >
                  Edit or delete Review
                </button>
                
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
