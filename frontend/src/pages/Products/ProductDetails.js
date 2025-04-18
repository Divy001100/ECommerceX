import { redirect, useRouteLoaderData } from "react-router"
import ProductItem from "../../components/Product/ProductItem"
function ProductDetailsPage(){
const product = useRouteLoaderData("product-detail")

    return (
       <ProductItem product={product}/>
    
    )
}

export default ProductDetailsPage



// loader to get one product


export async function loader({request,params}){
    const id = params.productId
    const response = await fetch(`/api/v1/products/${id}`)

    if(!response.ok){
        throw  new Response(JSON.stringify({message:`could not fetch product with ${id}`}),
         {status:500}
          )
    }

    const data = await response.json()
    return data.data.doc
}

// action to delete a product from producctitem-child-productdetail

export async function action({ request, params }) {
    const { productId } = params; // Get productId from URL
    const token = localStorage.getItem('token');
  
    // Make DELETE request to delete the product
    const response = await fetch(`/api/v1/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Response("Error deleting product", { status: 400 });
    }
  
    // After successful delete, redirect to the product list or another page
    return redirect('/products'); // Redirect to products list
  }