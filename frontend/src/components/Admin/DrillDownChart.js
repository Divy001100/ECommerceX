import React, { useState, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Define colors similar to the image
// Pie Chart: Blue, Purple, Teal
const PIE_COLORS = ["#3b82f6", "#8b5cf6", "#14b8a6"];
// Bar Chart: Blue
const BAR_COLOR = "#3b82f6";

// Custom Tooltip for Charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Check if it's for the rating bar chart (label is rating number)
    // or the overview pie chart (payload[0].name exists)
    const name = payload[0].name || `Rating ${label}`;
    const value = payload[0].value;
    return (
      <div className="bg-black/70 text-white p-2 rounded border border-white/20 text-sm">
        <p className="font-bold">{`${name}: ${value}`}</p>
      </div>
    );
  }
  return null;
};

export default function DrillDownChart({ users = [], products = [], reviews = [], onDrill, currentFilter, onReset }) {
  // --- Data Processing ---

  // 1. Overview Data (Pie Chart)
  const overviewData = [
    { name: "Products", value: products?.length || 0 },
    { name: "Users", value: users?.length || 0 },
    { name: "Reviews", value: reviews?.length || 0 },
  ].filter(d => d.value > 0); // Filter out sections with 0 value

  // Calculate percentages for Pie Chart labels
  const totalOverview = overviewData.reduce((sum, entry) => sum + entry.value, 0);

  // 2. Reviews by Rating Data (Bar Chart)
  const ratingCounts = reviews?.reduce((map, r) => {
      // Ensure rating is a number, default to 0 if invalid
      const rating = parseInt(r.rating, 10);
      if (!isNaN(rating) && rating >= 1 && rating <= 5) {
          map.set(rating, (map.get(rating) || 0) + 1);
      }
      return map;
  }, new Map());

  // Ensure all ratings 1-5 are present, even if count is 0
  const ratingData = [1, 2, 3, 4, 5].map(rating => ({
      name: String(rating), // XAxis expects string names
      value: ratingCounts?.get(rating) || 0,
  }));


  // --- Event Handlers ---

  const handlePieClick = useCallback((data) => {
      // data.name will be 'Products', 'Users', or 'Reviews'
      if (data && data.name && onDrill) {
          onDrill('overview', data.name);
      }
  }, [onDrill]);

  const handleBarClick = useCallback((data) => {
      // data might be null if clicking outside bars
      // data.activeLabel should be the rating ('1' to '5')
      if (data && data.activeLabel && onDrill) {
         onDrill('rating', data.activeLabel);
      }
  }, [onDrill]);


  // --- Rendering ---

  return (
    <div className="mb-10">
       {/* Display current filter and reset button if a filter is active */}
       {currentFilter && currentFilter.type && (
            <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-gray-400">
                    Showing data for: <span className="font-bold text-white">{`${currentFilter.type} = ${currentFilter.value}`}</span>
                </p>
                <button
                    onClick={onReset}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded"
                >
                    Reset View
                </button>
            </div>
        )}

      <div className="grid md:grid-cols-2 gap-8"> {/* Increased gap slightly */}

        {/* Overview Pie Chart */}
        <div className="bg-[#18181B] border border-white/10 rounded-lg p-4 shadow-md"> {/* Adjusted bg slightly, padding, shadow */}
          <h3 className="text-lg font-semibold text-white mb-4">Overview</h3> {/* Adjusted text size/weight */}
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={overviewData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={85} // Slightly larger radius
                fill="#8884d8" // Default fill, overridden by Cells
                labelLine={false}
                 // Custom label with percentage
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px">
                        {`${(percent * 100).toFixed(1)}%`}
                      </text>
                    );
                 }}
                onClick={handlePieClick} // Use the memoized handler
              >
                {overviewData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
              <Legend
                iconType="circle" // Match image legend style
                iconSize={10}
                wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} // Add padding top, adjust font size
                formatter={(value, entry) => <span style={{ color: '#9CA3AF' }}>{value}</span>} // Legend text color
               />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Reviews by Rating Bar Chart */}
        <div className="bg-[#18181B] border border-white/10 rounded-lg p-4 shadow-md"> {/* Adjusted bg slightly, padding, shadow */}
          <h3 className="text-lg font-semibold text-white mb-4">Reviews by Rating</h3> {/* Adjusted text size/weight */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ratingData} onClick={handleBarClick}> {/* Use the memoized handler */}
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} /> {/* Style X Axis */}
              <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} width={30}/> {/* Style Y Axis */}
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
              <Bar
                dataKey="value"
                fill={BAR_COLOR}
                radius={[4, 4, 0, 0]} // Keep rounded top corners
                barSize={30} // Adjust bar thickness if needed
               />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}