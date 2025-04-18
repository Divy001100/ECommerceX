import { NavLink } from "react-router";

function ProductNavigation(){
    const user = JSON.parse(localStorage.getItem("user"));


    return(
        <nav className="flex   ">
            <ul className=" flex flex-col gap-1 text-yellow-300 pd-10px mg-10px">
                <li>
                   <NavLink className={({isActive})=>isActive?'text-decoration-line: underline text-yellow-600':undefined}
                   end
                   to=".">🛒 All Products
                   </NavLink> 
                </li>
                {user?( <li>
                    <NavLink 
                    className={({isActive})=>isActive?'text-decoration-line: underline text-yellow-600':undefined}
                    to="new">➕ Add a new Product</NavLink>
                </li>):null }
               
                {/* <li>
                   <NavLink 
                   className={({isActive})=>isActive?'text-decoration-line: underline text-yellow-600':undefined}
                  end
                  to=":productId" >🔍 View Details</NavLink>
                </li>
                <li>
                    <NavLink 
                    className={({isActive})=>isActive?'text-decoration-line: underline text-yellow-600':undefined}
                    to=":productId/edit">✏️ Edit Product	</NavLink>
                </li> */}
                <li>
                    <NavLink 
                   to="." >Go Back</NavLink>
                </li>
                
            </ul>
        </nav>
    )
}

export default ProductNavigation