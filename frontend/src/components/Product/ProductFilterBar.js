import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductFilterBar({ products }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const filterableKeys = ["brand", "category", "color", "gender"];
  const numericKeys = ["price", "ratingsAverage"];

  useEffect(() => {
    const newFilters = {};
    filterableKeys.forEach((key) => {
      newFilters[key] = [...new Set(products.map((p) => p[key]).filter(Boolean))];
    });
    setFilters(newFilters);
  }, [products]);

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      searchParams.delete(name);
    } else {
      searchParams.set(name, value);
    }
  };

  const handleSearch = () => {
    if (sortField && sortOrder) {
      const sortValue = sortOrder === "asc" ? sortField : `-${sortField}`;
      searchParams.set("sort", sortValue);
    }
    navigate(`/products?${searchParams.toString()}`);
  };

  const handleReset = () => {
    setSearchParams({});
    navigate("/products");
    setSortField("");
    setSortOrder("");
  };

  return (
    <div className="bg-gradient-to-br from-[#0f0f0f] via-gray-900 to-white border-y border-white/10 py-3 px-4 mb-6">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {Object.entries(filters).map(([key, values]) => (
          <select
            key={key}
            name={key}
            onChange={handleParamChange}
            defaultValue={searchParams.get(key) || ""}
            className="bg-black/80 border border-white/10 text-white text-xs px-2 py-1 rounded focus:outline-none h-8"
          >
            <option value="">All {key}</option>
            {values.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        ))}

        {numericKeys.map((key) => (
          <div key={key} className="flex items-center gap-1">
            <input
              type="number"
              name={`${key}[gte]`}
              placeholder={`Min ${key}`}
              defaultValue={searchParams.get(`${key}[gte]`) || ""}
              onChange={handleParamChange}
              className="bg-black/80 border border-white/10 text-white text-xs px-2 py-1 rounded w-16 h-8"
            />
            <span className="text-gray-400 text-xs">to</span>
            <input
              type="number"
              name={`${key}[lte]`}
              placeholder={`Max ${key}`}
              defaultValue={searchParams.get(`${key}[lte]`) || ""}
              onChange={handleParamChange}
              className="bg-black/80 border border-white/10 text-white text-xs px-2 py-1 rounded w-16 h-8"
            />
          </div>
        ))}

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="bg-black/80 border border-white/10 text-white text-xs px-2 py-1 rounded h-8"
        >
          <option value="">Sort field</option>
          {numericKeys.concat("name").map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-black/80 border border-white/10 text-white text-xs px-2 py-1 rounded h-8"
        >
          <option value="">Order</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>

        <button
          onClick={handleSearch}
          className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-semibold rounded hover:opacity-90 transition h-8"
        >
          Search
        </button>

        <button
          onClick={handleReset}
          className="px-3 py-1 bg-gradient-to-r from-gray-600 to-gray-800 text-white text-xs font-semibold rounded hover:opacity-90 transition h-8"
        >
          Reset
        </button>
      </div>
    </div>
  );
}


// import { useSearchParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function ProductFilterBar({ products }) {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const [filters, setFilters] = useState({});
//   const [sortField, setSortField] = useState("");
//   const [sortOrder, setSortOrder] = useState("");
//   const [limit, setLimit] = useState(searchParams.get("limit") || 9);
//   const [pages, setPages] = useState([]);
//   const [maxPage, setMaxPage] = useState(1);

//   const filterableKeys = ["brand", "category", "color", "gender"];
//   const numericKeys = ["price", "ratingsAverage"];

//   useEffect(() => {
//     const newFilters = {};
//     filterableKeys.forEach((key) => {
//       newFilters[key] = [...new Set(products.map((p) => p[key]).filter(Boolean))];
//     });
//     setFilters(newFilters);

//     const totalProducts = products.length;
//     const pageCount = Math.ceil(totalProducts / limit);
//     setMaxPage(pageCount);
//     setPages(Array.from({ length: pageCount }, (_, i) => i + 1));
//   }, [products, limit]);

//   const handleParamChange = (e) => {
//     const { name, value } = e.target;
//     if (value === "") {
//       searchParams.delete(name);
//     } else {
//       searchParams.set(name, value);
//     }
//     setSearchParams(searchParams);
//     navigate(`/products?${searchParams.toString()}`);
//   };

//   const handleSortChange = () => {
//     if (sortField && sortOrder) {
//       const sortValue = sortOrder === "asc" ? sortField : `-${sortField}`;
//       searchParams.set("sort", sortValue);
//       setSearchParams(searchParams);
//       navigate(`/products?${searchParams.toString()}`);
//     }
//   };

//   const handlePageClick = (page) => {
//     searchParams.set("page", page);
//     setSearchParams(searchParams);
//     navigate(`/products?${searchParams.toString()}`);
//   };

//   return (
//     <div className="bg-[#0f0f0f] border-b border-white/10 py-3 px-4 mb-4">
//       <div className="flex flex-wrap items-center gap-4">
//         {/* Filters */}
//         {Object.entries(filters).map(([key, values]) => (
//           <div key={key} className="flex items-center">
//             <select
//               name={key}
//               onChange={handleParamChange}
//               defaultValue={searchParams.get(key) || ""}
//               className="bg-black/80 border border-white/10 text-white text-xs px-2 py-1 rounded focus:outline-none h-8"
//             >
//               <option value="">All {key}</option>
//               {values.map((v) => (
//                 <option key={v} value={v}>{v}</option>
//               ))}
//             </select>
//           </div>
//         ))}

//         {/* Numeric Filters */}
//         {numericKeys.map((key) => (
//           <div key={key} className="flex items-center gap-1">
//             <input
//               type="number"
//               name={`${key}[gte]`}
//               placeholder={`Min ${key}`}
//               defaultValue={searchParams.get(`${key}[gte]`) || ""}
//               onChange={handleParamChange}
//               className="bg-black/80 border border-white/10 text-white text-xs px-2 py-1 rounded w-16 h-8"
//             />
//             <span className="text-gray-400 text-xs">to</span>
//             <input
//               type="number"
//               name={`${key}[lte]`}
//               placeholder={`Max ${key}`}
//               defaultValue={searchParams.get(`${key}[lte]`) || ""}
//               onChange={handleParamChange}
//               className="bg-black/80 border border-white/10 text-white text-xs px-2 py-1 rounded w-16 h-8"
//             />
//           </div>
//         ))}

//         {/* Items Per Page */}
//         <div className="flex items-center">
//           <select
//             name="limit"
//             onChange={handleParamChange}
//             defaultValue={limit}
//             className="bg-black/80 border border-white/10 text-white text-xs px-2 py-1 rounded h-8"
//           >
//             <option value="6">6/page</option>
//             <option value="9">9/page</option>
//             <option value="12">12/page</option>
//           </select>
//         </div>

//         {/* Sorting */}
//         <div className="flex items-center gap-2">
//           <select
//             value={sortField}
//             onChange={(e) => setSortField(e.target.value)}
//             className="bg-black/80 border border-white/10 text-white text-xs px-2 py-1 rounded h-8"
//           >
//             <option value="">Sort by</option>
//             {numericKeys.concat("name").map((key) => (
//               <option key={key} value={key}>{key}</option>
//             ))}
//           </select>
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="bg-black/80 border border-white/10 text-white text-xs px-2 py-1 rounded h-8"
//           >
//             <option value="">Order</option>
//             <option value="asc">Asc</option>
//             <option value="desc">Desc</option>
//           </select>
//           <button
//             onClick={handleSortChange}
//             className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded h-8 hover:bg-blue-700"
//           >
//             Sort
//           </button>
//         </div>

//         {/* Pagination */}
//         <div className="flex gap-1 ml-auto">
//           {pages.map((p) => (
//             <button
//               key={p}
//               onClick={() => handlePageClick(p)}
//               className={`px-2 py-1 text-xs rounded transition-all duration-200 ${
//                 searchParams.get("page") == p.toString()
//                   ? "bg-blue-600 text-white"
//                   : "bg-white/10 text-gray-300 hover:bg-white/20"
//               }`}
//             >
//               {p}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }









