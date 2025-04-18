
import ProductForm from "../../components/Product/ProductForm"
import { useRouteLoaderData } from "react-router"
function EditProductPage(){
const product = useRouteLoaderData("product-detail")
return(
<ProductForm product={product} method={"PATCH"}/>
)
}

export default EditProductPage