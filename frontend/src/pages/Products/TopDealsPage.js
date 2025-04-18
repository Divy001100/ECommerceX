import { useLoaderData } from "react-router-dom";
import ProductsList from "../../components/Product/ProductsList";
import { apiFetch } from "../../api";
function TopDealsPage() {
  const products = useLoaderData();
 console.log(products)
  return (
    <div className="px-6 md:px-10 lg:px-20 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl shadow">
        🔥 Top 5 Cheap Deals
      </h1>
      <ProductsList products={products} />
    </div>
  );
}

export default TopDealsPage;
export async function loader() {
    const token = localStorage.getItem('token')
    const res = await apiFetch("/api/v1/products/top-5-cheap",{
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
  
    if (!res.ok) {
      throw new Response(
        JSON.stringify({ message: data.message || "Failed to load top deals" }),
        { status: res.status }
      );
    }
  
    return data.data.doc;
  }
  