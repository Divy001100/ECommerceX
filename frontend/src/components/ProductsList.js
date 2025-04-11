import { Link } from "react-router";

function ProductsList({ products }) {
   
  
    return (<div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto p-4">

  {products.map((product) => (
    
    <li key={product.id} className="bg-white text-black rounded shadow p-4">
      <Link to={product.id}>
      <img src={product.imageCover} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
      <p className="text-lg font-bold text-green-600">${product.price}</p>
      <p className="text-sm text-gray-700">{product.description}</p>
      <div className="text-sm mt-2">
        <span className="mr-2">Brand: {product.brand}</span>
        <span className="mr-2">Size: {product.size}</span>
        <span>Color: {product.color}</span>
        
      </div>
      </Link>
    </li>
  ))}
</ul>

    </div>
    );
  }
  
export default ProductsList