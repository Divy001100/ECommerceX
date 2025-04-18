import { redirect } from "react-router";
import ProductForm from "../../components/Product/ProductForm"


function NewProductPage(){

    return(
   <ProductForm method ={"POST"}/>
    

)
}

export default NewProductPage


// export async function action({ request }) {
   
//     const data = await request.formData();
  
//     const productData = {
//       name: data.get("name"),
//       category: data.get("category"),
//       price: Number(data.get("price")),
//       discount: Number(data.get("discount")),
//       description: data.get("description"),
//       brand: data.get("brand"),
//       size: data.get("size"),
//       gender: data.get("gender"),
//       color: data.get("color"),
//       imageCover: data.get("imageCover"),
//       images: data.get("images")?.split(",").map(img => img.trim()) // ✅ array
//     };
  
//     console.log("📦 Final data:", productData);
  
//     const response = await fetch(`/api/v1/products`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(productData)
//     });
  

  
//     if (!response.ok) {
//         const errData = await response.json(); // 👈 get real backend error message
//         console.error("🔥 Backend error:", errData); // ✅ ADD THIS
//         throw new Response(JSON.stringify({ message: errData.message || "Could not save product" }), {
//           status: 500
//         });
//       }
  
//     return redirect('/products');
//   }
