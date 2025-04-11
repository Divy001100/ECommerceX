import { Link } from "react-router";
import ProductsList from "../../components/ProductsList";
import { useLoaderData } from "react-router-dom";
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
export async function loader() {
  const response = await fetch(`/api/v1/products`);

  if (!response.ok) {
   throw  new Response(JSON.stringify({message:'could not fetch events'}),
  {status:500}
  )
  }

  const data = await response.json();
  return data.data.doc; 
}
