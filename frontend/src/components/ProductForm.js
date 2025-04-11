import { Form, useActionData } from "react-router-dom";

export default function ProductForm({ method, product }) {
  const errors = useActionData();

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h2>

        <Form method="POST" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={product?.name}
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Brand */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm text-gray-700">Brand</label>
              <input
                type="text"
                name="brand"
                defaultValue={product?.brand}
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm text-gray-700">Category</label>
              <select
                name="category"
                defaultValue={product?.category}
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="clothing">Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* Size */}
            {/* {product?.category==='clothing'&& */}
               <div className="flex flex-col">
               <label className="mb-1 font-medium text-sm text-gray-700">Size</label>
               <select
                 name="size"
                 defaultValue={product?.size}
                 className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                 <option value="">Select Size</option>
                 <option value="S">S</option>
                 <option value="M">M</option>
                 <option value="L">L</option>
                 <option value="XL">XL</option>
               </select>
             </div>
            {/* } */}
         

            {/* Gender */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm text-gray-700">Gender</label>
              <select
                name="gender"
                defaultValue={product?.gender}
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            {/* Brand */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm text-gray-700">color</label>
              <input
                type="text"
                name="color"
                defaultValue={product?.color}
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            

            {/* Price */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm text-gray-700">Price ($)</label>
              <input
                type="number"
                name="price"
                defaultValue={product?.price}
                step="0.01"
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/*discount*/}
          <div className="flex flex-col">
              <label className="mb-1 font-medium text-sm text-gray-700">discount ($)</label>
              <input
                type="number"
                name="discount"
                defaultValue={product?.discount}
                step="0.01"
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm text-gray-700">Description</label>
            <textarea
              name="description"
              rows="4"
              defaultValue={product?.description}
              className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* ImageCover */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm text-gray-700">Main Image URL (imageCover)</label>
            <input
              type="text"
              name="imageCover"
              defaultValue={product?.imageCover}
              className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              // required
            />
          </div>

          {/* Images (comma-separated string for now) */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm text-gray-700">Other Image URLs (comma-separated)</label>
            <input
              type="text"
              name="images"
              defaultValue={product?.images?.join(', ')}
              className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              Save Changes
            </button>
          </div>

          {/* Error Display */}
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
