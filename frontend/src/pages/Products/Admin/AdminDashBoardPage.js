// AdminDashboardPage.js
import { useLoaderData,useLocation } from "react-router-dom";
import { useState, useEffect, } from "react";
import DrilldownChart from "../../../components/Admin/DrillDownChart";
import ProductCard from "../../../components/Admin/ProductCard";

import ReviewTable from "../../../components/Admin/ReviewTable";

export default function AdminDashboardPage({ previewMode }) {
  const location = useLocation();
  const preview = previewMode ?? new URLSearchParams(location.search).get("preview") === "true";
  const { users, products, reviews } = useLoaderData();
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [searchID, setSearchID] = useState("");
  console.log(users)

  useEffect(() => {
    if (!searchID) {
      setFilteredUsers(users);
      setFilteredProducts(products);
      setFilteredReviews(reviews);
    } else {
      setFilteredUsers(users.filter((u) => u._id.includes(searchID)));
      setFilteredProducts(products.filter((p) => p._id.includes(searchID)));
      setFilteredReviews(reviews.filter((r) => r._id.includes(searchID)));
    }
  }, [searchID, users, products, reviews]);

  const handleDrilldown = (type, value) => {
    if (type === "category") {
      const matched = products.filter((p) => p.category === value);
      const matchedIds = matched.map((m) => m._id);
      const relatedReviews = reviews.filter((r) => matchedIds.includes(r.product));
      setFilteredProducts(matched);
      setFilteredReviews(relatedReviews);
    }
    if (type === "user") {
      const matchedUser = users.find((u) => u.name === value);
      if (matchedUser) {
        const pid = products.filter((p) => p.user === matchedUser._id);
        const rid = reviews.filter((r) => r.user._id === matchedUser._id);
        setFilteredProducts(pid);
        setFilteredReviews(rid);
        setFilteredUsers([matchedUser]);
      }
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen text-white px-6 py-10 space-y-10">
      <div className="flex justify-between items-center">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 via-blue-100 to-blue-600 bg-clip-text text-transparent">
  Overview
</h1>
        <input
          type="text"
          placeholder="Search by ID"
          value={searchID}
          onChange={(e) => setSearchID(e.target.value)}
          className="bg-[#1e1e1e] text-white px-4 py-2 rounded-xl border border-white/10"
        />
      </div>

      <DrilldownChart
        users={users}
        products={products}
        reviews={reviews}
        preview={preview}
        onDrill={handleDrilldown}
        onReset={() => {
          setSearchID("");
          setFilteredUsers(users);
          setFilteredProducts(products);
          setFilteredReviews(reviews);
        }}
      />

<h2 className="text-2xl font-bold mt-10 mb-4 bg-gradient-to-r from-blue-500 via-blue-400 to-white bg-clip-text text-transparent">
  Products
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
  {filteredProducts.map((p) => (
    <ProductCard key={p._id} product={p} preview={preview} />
  ))}
</div>



<div className="mt-10 ">
  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-blue-400 to-white bg-clip-text text-transparent">
    Reviews
  </h2>
  <ReviewTable reviews={filteredReviews} preview={preview} />
</div>


    </div>
  );
}


// AdminDashboardLoader.js
export async function loader() {
  let token;

  // Only try to access localStorage if available
  try {
    token = localStorage.getItem("token");
  } catch (err) {
    token = null;
  }

  const [userRes, productRes, reviewRes] = await Promise.all([
    fetch("/api/v1/users?limit=1000", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
    fetch("/api/v1/products?limit=1000"),
    fetch("/api/v1/reviews?limit=1000", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  ]);

  const [userData, productData, reviewData] = await Promise.all([
    userRes.json(),
    productRes.json(),
    reviewRes.json(),
  ]);

  return {
    users: userData.data?.doc || [],
    products: productData.data?.doc || [],
    reviews: reviewData.data?.doc || [],
  };
}
