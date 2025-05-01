import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#EF4444", "#10B981"];

const BudgetChart = ({ totalIncome, totalBills }) => {
  const remaining = totalIncome - totalBills;

  const data = [
    { name: "Bills", value: totalBills },
    { name: "Remaining", value: remaining > 0 ? remaining : 0 },
  ];

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
