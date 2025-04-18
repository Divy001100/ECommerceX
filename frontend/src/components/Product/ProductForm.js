import { Form, redirect, useActionData } from "react-router-dom";
import { useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";
import { apiFetch } from "../../api";

export default function ProductForm({ method, product }) {
  const errors = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedErrors = { ...fieldErrors };

    // VALIDATION BASED ON MODEL
    if (name === "name") {
      if (value.trim().length < 3) {
        updatedErrors.name = "Must be at least 3 characters.";
      } else if (value.length > 40) {
        updatedErrors.name = "Must be less than 40 characters.";
      } else {
        delete updatedErrors.name;
      }
    }

    if (name === "category") {
      const validCategories = ["electronics", "clothing", "shoes", "accessories", "books"];
      if (!validCategories.includes(value)) {
        updatedErrors.category = "Invalid category.";
      } else {
        delete updatedErrors.category;
      }
    }

    if (name === "price") {
      if (value <= 0 || isNaN(value)) {
        updatedErrors.price = "Enter a valid price.";
      } else {
        delete updatedErrors.price;
      }
    }

    if (name === "discount") {
      const priceVal = parseFloat(document.querySelector("input[name='price']")?.value);
      const discountVal = parseFloat(value);
      if (!isNaN(priceVal) && discountVal >= priceVal) {
        updatedErrors.discount = "Discount must be less than price.";
      } else {
        delete updatedErrors.discount;
      }
    }

    if (name === "gender") {
      const validGenders = ["male", "female", "uniSex"];
      if (value && !validGenders.includes(value)) {
        updatedErrors.gender = "Invalid gender.";
      } else {
        delete updatedErrors.gender;
      }
    }

    setFieldErrors(updatedErrors);
  };

  const errorClass = (field) =>
    `bg-gray-50 border ${fieldErrors[field] ? "border-red-500 placeholder-red-400 text-red-600" : "border-gray-300"} rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500`;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h2>

        <Form method={method} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={product?.name}
                onChange={handleChange}
                placeholder={fieldErrors.name || "Product name"}
                className={errorClass("name")}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm text-gray-700">Brand</label>
              <input
                type="text"
                name="brand"
                defaultValue={product?.brand}
                onChange={handleChange}
                className={errorClass("brand")}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm text-gray-700">Category</label>
              <select
                name="category"
                defaultValue={product?.category}
                onChange={handleChange}
                className={errorClass("category")}
                required
              >
                <option value="">Select Category</option>
                <option value="clothing">Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="accessories">Accessories</option>
                <option value="shoes">Shoes</option>
                <option value="books">Books</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm text-gray-700">Size</label>
              <select
                name="size"
                defaultValue={product?.size}
                onChange={handleChange}
                className={errorClass("size")}
              >
                <option value="">Select Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm text-gray-700">Gender</label>
              <select
                name="gender"
                defaultValue={product?.gender}
                onChange={handleChange}
                className={errorClass("gender")}
              >
                <option value="">Select Gender</option>
                <option value="male">Men</option>
                <option value="female">Women</option>
                <option value="uniSex">Unisex</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm text-gray-700">Color</label>
              <input
                type="text"
                name="color"
                defaultValue={product?.color}
                className={errorClass("color")}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm text-gray-700">Price ($)</label>
              <input
                type="number"
                name="price"
                defaultValue={product?.price}
                step="0.01"
                onChange={handleChange}
                placeholder={fieldErrors.price || "Enter price"}
                className={errorClass("price")}
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm text-gray-700">Discount ($)</label>
            <input
              type="number"
              name="discount"
              defaultValue={product?.discount}
              step="0.01"
              onChange={handleChange}
              placeholder={fieldErrors.discount || "Optional"}
              className={errorClass("discount")}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm text-gray-700">Description</label>
            <textarea
              name="description"
              rows="4"
              defaultValue={product?.description}
              className={errorClass("description")}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm text-gray-700">Main Image URL (imageCover)</label>
            <input
              type="text"
              name="imageCover"
              defaultValue={product?.imageCover}
              className={errorClass("imageCover")}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm text-gray-700">Other Image URLs (comma-separated)</label>
            <input
              type="text"
              name="images"
              defaultValue={product?.images?.join(', ')}
              className={errorClass("images")}
            />
          </div>

          {navigation.state === 'submitting' ? (
            <p className="text-sm text-blue-700 font-medium text-right">Saving Product...</p>
          ) : (
            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                Save Changes
              </button>
            </div>
          )}

          <div className="text-right">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              Cancel
            </button>
          </div>

          {errors && (
            <div className="text-red-600 text-sm font-medium mt-4">
              {errors.message || "Something went wrong."}
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}



// same action for edit and new product 

export async function action({ request,params }) {
  // access the token 
  const token = localStorage.getItem("token");

   
  const data = await request.formData();

  const productData = {
    name: data.get("name"),
    category: data.get("category"),
    price: Number(data.get("price")),
    discount: Number(data.get("discount")),
    description: data.get("description"),
    brand: data.get("brand"),
    size: data.get("size"),
    gender: data.get("gender"),
    color: data.get("color"),
    imageCover: data.get("imageCover"),
    images: data.get("images")?.split(",").map(img => img.trim()) // ✅ array
  };

  let url=""

 if (request.method==="POST"){ 
  url =`/api/v1/products`
 }else{
  const id =params.productId
  url = `/api/v1/products/${id}`
 }


  const response = await apiFetch(url, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });



  if (!response.ok) {
      const errData = await response.json(); // 👈 get real backend error message
      console.error("🔥 Backend error:", errData); // ✅ ADD THIS
      throw new Response(JSON.stringify({ message: errData.message || "Could not save product" }), {
        status: 500
      });
    }

  return redirect('/products');
}
