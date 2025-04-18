import { apiFetch } from "../../../api";

function CheckoutPage(){

    return (<p>
        Redirecting to secure payment....
    </p>

    )
}

export async function loader({ params }) {
    const token = localStorage.getItem("token");
  const id = params.productId
    const response = await apiFetch(`/api/v1/order/checkout-session/${params.productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Response(
        JSON.stringify({ message: data.message || "Please sign in to continue" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
  
    window.location.href = data.session.url;
    return null;
  }
  export default CheckoutPage;