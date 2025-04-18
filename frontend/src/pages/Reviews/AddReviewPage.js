import { redirect } from "react-router";
import AddReviewForm from "../../components/Review/AddReviewForm";

function AddReviewPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    return (
        <AddReviewForm />
    );
}

export default AddReviewPage;

export async function action({ request, params }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const productId = params.productId;
  
    const formData = await request.formData();
  
    const review = formData.get("review");
    const rating = formData.get("rating");
    const photoInput = formData.get("images"); // comma separated if used as input
  
    const photo = photoInput
      ? photoInput.split(",").map((url) => url.trim())
      : [];
  
    const payload = {
      review,
      rating,
      photo,
      
    };
  
    const response = await fetch(`/api/v1/products/${productId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  
    const resData = await response.json();
  
    if (!response.ok) {
      throw new Response(
        JSON.stringify({ message: resData.message || "Couldn't post a review" }),
        {
          status: response.status,
        }
      );
    }
  
    return redirect(`/products/${productId}`);
  }
  