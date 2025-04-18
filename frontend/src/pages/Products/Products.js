import { Link } from "react-router";
import ProductsList from "../../components/Product/ProductsList";
import { useLoaderData } from "react-router-dom";
import { apiFetch } from "../../api";
// import { json } from '@remix-run/router'

export default function ProductsPage(){
    const data = useLoaderData();
    


    return (
        <>
       <ProductsList products={data}/>
     </>
    )
}



// Use Loader to get All product and
// pass them to productsList
export async function loader({request}) {
  const url = new URL(request.url);
  const queryString = url.searchParams.toString(); // gives full ?... string
  const res = await apiFetch(`/api/v1/products?${queryString}`);

  if (!res.ok) {
   throw  new Response(JSON.stringify({message:'could not fetch events'}),
  {status:500}
  )
  }

  const data = await res.json();
  return data.data.doc; 
}
