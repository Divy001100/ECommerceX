import { Outlet } from "react-router"
import ProductNavigation from "../../components/Navigation/ProductNavigation"

function ProductLayout(){
    return(<>
    <main>
       < ProductNavigation/>
    </main>
    <Outlet/>
    
    </>)
}

export default ProductLayout;