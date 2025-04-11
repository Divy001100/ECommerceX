import { useRouteLoaderData } from "react-router"
import ProductItem from "../../components/ProductItem"
function ProductDetailsPage(){
const product = useRouteLoaderData("product-detail")

    return (
       <ProductItem product={product}/>
    
    )
}

export default ProductDetailsPage



// loader to get one product


export async function loader({req,params}){
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