import { useParams } from "react-router";
import { useRouteLoaderData, useSubmit } from "react-router";
import EditReviewForm from "../../components/Review/EditReviewForm";
import { redirect } from "react-router";

function EditReviewPage() {
  const { productId, reviewId } = useParams(); // Get productId and reviewId from the URL
  const product = useRouteLoaderData("product-detail"); // Get product data from the loader
  const submit = useSubmit(); // Initialize submit

  // Find the review to edit
  const review = product.reviews.find((r) => r._id === reviewId);

  // Handle delete click (this will trigger the DELETE method)
  const handleDeleteClick = () => {
    const check = window.confirm("Are you sure you want to delete this review?");
    if (check) {
      submit(null, { method: "DELETE" }); // Trigger DELETE request programmatically
    }
  };

  return (
    <>
      <EditReviewForm review={review} method="PATCH" product={product} />
      
      {/* Form for the DELETE request */}
      <button onClick={handleDeleteClick} className="delete-review-button">
        Delete Review 
      </button>
    </>
  );
}

export async function action({ request, params }) {
  const { reviewId, productId } = params; // Get productId and reviewId from URL
  const token = localStorage.getItem("token");

  // Handle DELETE request
  if (request.method === "DELETE") {
    const response = await fetch(`/api/v1/products/${productId}/reviews/${reviewId}`, {
      method: "DELETE", // DELETE request for deleting the review
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Response("Error deleting review", { status: 400 });
    }

    return redirect(`/products/${productId}`); // Redirect after deleting the review
  }

  // Handle PATCH request (Edit Review)
  const data = await request.formData();
  const images = data
    .getAll("images")
    .map((url) => url.trim())
    .filter((url) => url.length > 0); // Only keep non-empty strings

  const reviewData = {
    rating: Number(data.get("rating")),
    review: data.get("review"),
    images: images.length > 0 ? images : [], // Force empty array if no images
  };

  const response = await fetch(`/api/v1/products/${productId}/reviews/${reviewId}`, {
    method: "PATCH", // Handle PATCH request for updating the review
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: resData.message }), { status: 400 });
  }

  return redirect(`/products/${productId}`); // Redirect after updating the review
}


export default EditReviewPage;
