
import ProductForm from "../../components/ProductForm"
import { useRouteLoaderData } from "react-router"
function EditProductPage(){
const product = useRouteLoaderData("product-detail")
return(
<ProductForm product={product}/>
)
}

export default EditProductPage