import { useLoaderData, Link } from 'react-router-dom';
import { apiFetch } from '../../../api';
function MyOrdersPage() {
  const orders = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order._id} className="border p-4 rounded shadow">
              <img
                src={order.product?.imageCover}
                alt={order.product?.name}
                className="w-24 h-24 object-cover mb-2"
              />
              <h3 className="text-lg font-semibold">{order.product?.name}</h3>
              <p>Price: ${order.price}</p>
              <p>Status: {order.paymentStatus} | {order.deliveryStatus}</p>

              <Link
                to={`/orders/${order._id}`}
                className="mt-2 inline-block text-blue-600 hover:underline font-medium"
              >
                View Details →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyOrdersPage;

export async function loader() {
    const token = localStorage.getItem('token');
  
    const res = await apiFetch('/api/v1/order/my-orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Response('Failed to load orders', { status: res.status });
    }
  
    const data = await res.json();
    return data.data.orders;
  }
  