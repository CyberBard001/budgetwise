import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Colour palette
const COLOURS = {
  essential:   "#10B981", // green‑500
  flexible:    "#FBBF24", // amber‑400
  overspend:   "#EF4444", // red‑500
  plannedTint: "#CBD5E1", // slate‑300 (neutral for planned)
};

// Decide colour by bill type / warning
const getColour = (entry) => {
  if (entry.needsCashWarning) return COLOURS.overspend;
  return entry.type === "Essential" ? COLOURS.essential : COLOURS.flexible;
};

const CategoryBarChart = ({ data }) => (
  <div className="bg-white dark:bg-gray-800 shadow p-4 rounded mb-6">
    <h2 className="text-lg font-semibold mb-2">
      Planned vs Actual&nbsp;(by Category)
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
        barCategoryGap={20}
      >
        <XAxis dataKey="category" stroke="#6366F1" />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* Planned (light neutral tint) */}
        <Bar dataKey="planned" name="Planned">
          {data.map((entry, idx) => (
            <Cell key={`planned-${idx}`} fill={COLOURS.plannedTint} />
          ))}
        </Bar>

        {/* Actual – colour coded by type / warning */}
        <Bar dataKey="actual" name="Actual">
          {data.map((entry, idx) => (
            <Cell
              key={`actual-${idx}`}
              fill={getColour(entry)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default CategoryBarChart;
