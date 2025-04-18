import { useState } from "react";
import { Form } from "react-router-dom";

function AddReviewForm() {
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [imageUrls, setImageUrls] = useState("");

  return (
    <div className="animate-slide-down bg-white shadow-2xl rounded-xl px-8 py-10 w-full max-w-lg mx-auto">
      <h2>Add Your Review</h2>
      <Form method="post" className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Rating */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-800">Rating</label>
            <select
              name="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900"
              required
            >
              <option value="">Select</option>
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
              required
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900"
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
              placeholder="https://img1.jpg, https://img2.jpg"
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-blue-600 text-sm"
            >
              Add Review
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default AddReviewForm;
