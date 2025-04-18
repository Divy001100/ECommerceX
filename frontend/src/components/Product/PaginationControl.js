import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PaginationControl({ totalItems = 0 }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit, setLimit] = useState(Number(searchParams.get("limit")) || 9);

  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
    navigate(`/products?${searchParams.toString()}`);
    setPage(newPage);
  };

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);
    searchParams.set("limit", newLimit);
    searchParams.set("page", 1); // reset to first page
    setSearchParams(searchParams);
    navigate(`/products?${searchParams.toString()}`);
    setLimit(newLimit);
    setPage(1);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      {/* Limit Selector */}
      <div className="flex items-center gap-2">
        <span className="text-white text-sm">Items per page:</span>
        <select
          value={limit}
          onChange={handleLimitChange}
          className="bg-black/80 text-white text-sm border border-white/10 rounded px-2 py-1"
        >
          {[6, 9, 12, 18, 24].map((val) => (
            <option key={val} value={val}>{val}</option>
          ))}
        </select>
      </div>

      {/* Page Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-3 py-1 rounded-lg text-sm font-medium border transition-all duration-300 ${
              p === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white/10 text-gray-300 hover:bg-white/20 border-white/20"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}