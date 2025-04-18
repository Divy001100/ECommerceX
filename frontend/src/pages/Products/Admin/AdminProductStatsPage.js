import { useLoaderData } from "react-router-dom";
import { useState, useMemo } from "react";
import { apiFetch } from "../../../api";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis,
  ComposedChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { Tabs, Tab, Select, Switch, Card, Divider } from "@mui/material";
import { GridView, BarChart as BarChartIcon, PieChart as PieChartIcon, ShowChart } from "@mui/icons-material";

const COLORS = ["#6366F1", "#EC4899", "#10B981", "#F59E0B", "#3B82F6", "#8B5CF6", "#EF4444"];

function AdminProductStatsPage() {
  const stats = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [show3D, setShow3D] = useState(false);
  const [chartMode, setChartMode] = useState("overview");

  const filteredStats = selectedCategory
    ? stats.filter((s) => s._id === selectedCategory)
    : stats;

  const handleSliceClick = (data) => {
    setSelectedCategory((prev) => (prev === data._id ? null : data._id));
  };

  const transformedData = useMemo(() => {
    return stats.map(item => ({
      ...item,
      priceRange: item.maxPrice - item.minPrice,
      ratingPerProduct: item.avgRatingNumber / item.totalProducts
    }));
  }, [stats]);

  const priceDistributionData = useMemo(() => {
    return stats.flatMap(category => [
      { name: `${category._id} Min`, value: category.minPrice, category: category._id, type: 'min' },
      { name: `${category._id} Avg`, value: category.avgPrice, category: category._id, type: 'avg' },
      { name: `${category._id} Max`, value: category.maxPrice, category: category._id, type: 'max' }
    ]);
  }, [stats]);

  return (
    <section className="px-4 py-8 md:px-8 lg:px-16 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Product Analytics Dashboard
        </h1>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Select
            value={selectedCategory || "all"}
            onChange={(e) => setSelectedCategory(e.target.value === "all" ? null : e.target.value)}
            className="bg-white rounded-lg"
            size="small"
          >
            <option value="all">All Categories</option>
            {stats.map((stat) => (
              <option key={stat._id} value={stat._id}>
                {stat._id}
              </option>
            ))}
          </Select>
          
          <div className="flex items-center">
            <GridView className="mr-1" />
            <Switch checked={show3D} onChange={() => setShow3D(!show3D)} />
            <ShowChart className="ml-1" />
          </div>
        </div>
      </div>

      <Tabs 
        value={activeTab} 
        onChange={(e, newValue) => setActiveTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        className="mb-6"
      >
        <Tab label="Overview" icon={<BarChartIcon />} />
        <Tab label="Distribution" icon={<PieChartIcon />} />
        <Tab label="Trends" icon={<ShowChart />} />
        <Tab label="Relationships" />
      </Tabs>

      {activeTab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-4 shadow-lg rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Price Composition</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={filteredStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="minPrice" fill="#10B981" stroke="#10B981" fillOpacity={0.2} />
                <Bar dataKey="avgPrice" fill="#6366F1" name="Average Price" />
                <Line type="monotone" dataKey="maxPrice" stroke="#F59E0B" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4 shadow-lg rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Product vs Rating Density</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="totalProducts" name="Products" />
                <YAxis type="number" dataKey="avgRatingNumber" name="Ratings" />
                <ZAxis type="number" dataKey="avgPrice" range={[60, 400]} name="Price" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="Categories" data={filteredStats} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {activeTab === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-4 shadow-lg rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={stats}
                  dataKey="totalProducts"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={show3D ? 120 : 100}
                  innerRadius={show3D ? 60 : 0}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  onClick={handleSliceClick}
                  paddingAngle={show3D ? 5 : 0}
                >
                  {stats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      cursor="pointer"
                      stroke="white"
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [
                  `${props.payload._id}: ${value} products`,
                  `${((props.payload.totalProducts / stats.reduce((acc, curr) => acc + curr.totalProducts, 0)) * 100).toFixed(1)}% of total`
                ]} />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4 shadow-lg rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Price Range Distribution</h2>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart outerRadius={150} data={filteredStats}>
                <PolarGrid />
                <PolarAngleAxis dataKey="_id" />
                <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 20']} />
                <Radar name="Min Price" dataKey="minPrice" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Radar name="Avg Price" dataKey="avgPrice" stroke="#6366F1" fill="#6366F1" fillOpacity={0.6} />
                <Radar name="Max Price" dataKey="maxPrice" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {activeTab === 2 && (
        <Card className="p-4 shadow-lg rounded-xl mb-8">
          <h2 className="text-xl font-semibold mb-4">Price & Rating Trends</h2>
          <div className="flex justify-end mb-4">
            <Select
              value={chartMode}
              onChange={(e) => setChartMode(e.target.value)}
              className="bg-white rounded-lg"
              size="small"
            >
              <option value="overview">Overview</option>
              <option value="price">Price Analysis</option>
              <option value="rating">Rating Analysis</option>
            </Select>
          </div>
          
          <ResponsiveContainer width="100%" height={500}>
            <ComposedChart data={filteredStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              
              {chartMode === 'overview' || chartMode === 'price' ? (
                <>
                  <Area yAxisId="left" type="monotone" dataKey="minPrice" fill="#10B981" stroke="#10B981" name="Min Price" />
                  <Line yAxisId="left" type="monotone" dataKey="avgPrice" stroke="#6366F1" strokeWidth={2} name="Avg Price" />
                  <Line yAxisId="left" type="monotone" dataKey="maxPrice" stroke="#F59E0B" strokeDasharray="5 5" name="Max Price" />
                </>
              ) : null}
              
              {chartMode === 'overview' || chartMode === 'rating' ? (
                <Bar yAxisId="right" dataKey="avgRatingNumber" fill="#EC4899" name="Total Ratings" />
              ) : null}
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      )}

      {activeTab === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-4 shadow-lg rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Price vs Rating Correlation</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="avgPrice" name="Avg Price" />
                <YAxis type="number" dataKey="avgRatingNumber" name="Total Ratings" />
                <ZAxis type="number" dataKey="totalProducts" range={[60, 400]} name="Products" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="Categories" data={filteredStats} fill="#8884d8" shape="circle" />
              </ScatterChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4 shadow-lg rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Product Metrics Matrix</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart
                layout="vertical"
                data={filteredStats}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" />
                <YAxis dataKey="_id" type="category" scale="band" />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalProducts" barSize={20} fill="#413ea0" name="Products" />
                <Line dataKey="avgRatingNumber" stroke="#ff7300" name="Ratings" />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

<Card className="p-6 rounded-3xl shadow-xl bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#000000] border border-white/10 backdrop-blur-md text-white">
        <h2 className="text-xl font-semibold mb-4">Detailed Metrics</h2>
        <div className="overflow-x-auto ">
          <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-gray-300">
          <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ratings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ratings/Product</th>
              </tr>
            </thead>
            <tbody className="bg-white/20 divide-y divide-black-700">
            {transformedData.map((stat) => (
              
                <tr 
                
                  key={stat._id} 
                  className={`hover:bg-gray-50 cursor-pointer ${selectedCategory === stat._id ? 'bg-indigo-50' : ''}`}
                  onClick={() => setSelectedCategory(stat._id === selectedCategory ? null : stat._id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium capitalize">{stat._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{stat.totalProducts}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${stat.avgPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${stat.minPrice.toFixed(2)} - ${stat.maxPrice.toFixed(2)}</td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">{Math.round(stat.avgRatingNumber)}</td> */}
                  <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        stat.avgRatingNumber > 100 ? "text-green-400 font-semibold" : ""
                      }`}
                    >
                      {Math.round(stat.avgRatingNumber)}
                    </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">{stat.ratingPerProduct.toFixed(1)}</td> */}
                                          <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            stat.avgPrice > 50 ? "text-red-400 font-semibold" : ""
                          }`}
                        >
                          ${stat.avgPrice.toFixed(2)}
                        </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}

export default AdminProductStatsPage;







// export async function loader() {
//     const token = localStorage.getItem("token");
  
//     const response = await fetch("/api/v1/products/product-stats", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
  
//     const data = await response.json();
  
//     if (!response.ok) {
//       throw new Response(
//         JSON.stringify({ message: data.message || "Failed to load stats" }),
//         { status: response.status }
//       );
//     }
  
//     return data.data.stats;
//   }
export async function loader({ request }) {
  const url = new URL(request.url);
  const isPreview = url.searchParams.get("preview") === "true";

  const headers = {};

  // Only attach token if NOT preview
  if (!isPreview) {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
  }

  const res = await apiFetch(`/api/v1/products/product-stats${isPreview ? '?preview=true' : ''}`, {
    headers
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to load stats');
  }

  return data.data.stats;
}
