import { Link } from "react-router";


function ProductItem({product}){
 

    return(
        <article>
         <div>
            <img src={product.imageCover} alt = {product.name}/>
         </div>
         <div>
            {product.images && product.images.length>0 && (
                 <div> {product.images.map((image,index)=>(
                 <img key={index} src={image}></img> 
                ))}
                </div>
             )}
             </div>

             <div>
                <strong>{product.brand} - {product.name}</strong>
                <h1>Brand- {product.brand}</h1>
                <h1>Size -{product.size}, {product.gender}</h1>
                <p>{product.category}</p>

                <p>price: {product.price}</p>
                <p>price in INR: {product.priceinINR}</p>
                <p>{product.description}</p>
                <h1>Average Ratings: {product.ratingsAverage}</h1>
                <h1>{product.ratingsQuantity} people have rated this product</h1>
                <h1> Reviews:
                    {product.reviews.map((review, index)=>(
                       <h1 key={index}>
                        {review.review}

                       </h1> 
                    ))}
                </h1>
                <menu>
                    <Link to="edit">Edit Product</Link>
                    <menu>
                          <Link to="delete">Delete This Product</Link>
                    </menu>
              
                </menu>
                

             </div>
       












        </article>
    )
}

export default ProductItem;