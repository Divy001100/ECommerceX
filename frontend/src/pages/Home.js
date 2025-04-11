import { Link } from "react-router";

export default function HomePage(){


    return(
       <>
       <h1>HomePage</h1>
       <Link to="products">
       view our products
       </Link>

       </>
    )
}