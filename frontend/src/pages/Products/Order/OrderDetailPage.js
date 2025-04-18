import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../../api';
function OrderDetailsPage() {
  const order = useLoaderData();

  return (
    <div className="border p-6 rounded shadow">
  <img
    src={order.product?.imageCover}
    alt={order.product?.name}
    className="w-32 h-32 object-cover mb-4"
  />
  <h3 className="text-xl font-semibold">
    {order.product?.name}
  </h3>
  <p>Price: ${order.price}</p>
  <p>Status: {order.paymentStatus} | {order.deliveryStatus}</p>
  <p>
    Shipping: {order.shippingLocation?.address}, {order.shippingLocation?.city}
  </p>

  <div className="mt-4">
    <Link
      to={`/products/${order.product?._id}`}
      className="text-blue-600 hover:underline font-medium"
    >
      🔁 View Product Page
    </Link>
  </div>
</div>

  );
}

export default OrderDetailsPage;
export async function loader({ params }) {
    const token = localStorage.getItem('token');
  
    const res = await apiFetch(`/api/v1/order/my-orders/${params.orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    if (!res.ok) {
      throw new Response("Order not found", { status: 404 });
    }
  
    const data = await res.json();
    return data.data.order;
  }
  