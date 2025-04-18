import { Form, useSubmit } from "react-router-dom";
import { useState } from "react";

function EditReviewForm({ review, product }) {
  const [rating, setRating] = useState(review.rating);
  const [reviewText, setReviewText] = useState(review.review);
  const [imageUrls, setImageUrls] = useState(review.images?.join(", ") || "");
  const submit = useSubmit();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      submit(null, {
        method: "DELETE",
        action: `/products/${product._id}/reviews/${review._id}`
      });
    }
  };

  return (
    <div className="animate-slide-down bg-white shadow-2xl rounded-xl px-8 py-10 w-full max-w-lg mx-auto">
      <h2>Edit Review</h2>
      <Form method="PATCH">
        <div className="space-y-6">
          {/* Rating */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-800">Rating</label>
            <select
              name="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          {/* Review Text */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-800">Your Review</label>
            <textarea
              name="review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image URLs */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-800">Image URLs (comma separated)</label>
            <input
              type="text"
              name="images"
              value={imageUrls}
              onChange={(e) => setImageUrls(e.target.value)}
              placeholder="Enter image URLs separated by commas"
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <small className="text-gray-500">You can add multiple URLs separated by commas.</small>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition font-semibold text-sm shadow-md"
            >
              Update Review
            </button>
            
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition font-semibold text-sm shadow-md"
            >
              Delete Review
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditReviewForm;