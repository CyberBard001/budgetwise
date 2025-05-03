import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#EF4444", "#10B981"];

// 🎨 choose bar colour based on type & cash warning
const getActualColour = (entry) => {
  if (entry.type === "Essential") return "#16a34a";       // green-600
  if (entry.type === "Flexible" && entry.needsCashWarning)
    return "#dc2626";                                     // red-600
  return "#d97706";                                       // amber-600 (normal flexible)
};

const BudgetChart = ({ data = [] }) => {
  // bail‑out until we actually have something to draw
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 shadow p-4 rounded mb-6 text-black dark:text-white">
      <h2 className="text-lg font-semibold mb-4">Income Distribution</h2>
      <PieChart width={300} height={250}>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default BudgetChart;
