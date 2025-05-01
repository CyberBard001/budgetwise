import React, { useState, useEffect } from "react";
import IncomeForm from "./components/IncomeForm";
import BillsForm from "./components/BillsForm";
import BudgetChart from "./components/BudgetChart";
import { exportToCSV } from "./utils/exportToCSV";

const App = () => {
  const [income, setIncome] = useState(null);
  const [bills, setBills] = useState([]);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleIncomeUpdate = (data) => setIncome(data);
  const handleBillsUpdate = (data) => setBills(data);

  const totalBills = bills.reduce((sum, bill) => sum + (parseFloat(bill.amount) || 0), 0);
  const payPeriods =
    income?.frequency === "weekly"
      ? 4
      : income?.frequency === "biweekly"
      ? 2
      : income?.frequency === "monthly"
      ? 1
      : 0;
  const perPaySetAside =
    payPeriods && totalBills
      ? (totalBills / payPeriods).toFixed(2)
      : "0.00";

  const canAffordSetAside = income?.amount >= parseFloat(perPaySetAside);
  const hasShortfall = income?.amount * payPeriods < totalBills;
  const shortfallAmount = totalBills - income?.amount * payPeriods;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-4">
      {/* Sticky Top Navbar */}
      <header className="sticky top-0 z-50 bg-gray-200 dark:bg-gray-900 shadow p-3 flex gap-4 justify-center">
        <a href="#income" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Income</a>
        <a href="#bills" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Bills</a>
        <a href="#chart" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Chart</a>
        <a href="#summary" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Summary</a>
      </header>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="bg-gray-800 text-white dark:bg-yellow-400 dark:text-black px-3 py-1 rounded"
        >
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-6">BudgetWise MVP</h1>

      <div id="income">
        <IncomeForm onIncomeUpdate={handleIncomeUpdate} />
      </div>
      <div id="bills">
        <BillsForm onBillsUpdate={handleBillsUpdate} />
      </div>

      {income && bills.length > 0 && (
        <>
          <div id="chart">
            <BudgetChart
              totalIncome={Number(income.amount) * payPeriods}
              totalBills={totalBills}
            />
          </div>
          <div id="summary" className="bg-white dark:bg-gray-800 shadow p-4 rounded text-black dark:text-white">
            <h2 className="text-lg font-semibold mb-2">Summary</h2>

            <p>Total Monthly Bills: <strong>£{totalBills.toFixed(2)}</strong></p>
            <p>Pay Frequency: <strong>{income.frequency}</strong></p>
            <p>Pay Per Period: <strong>£{Number(income.amount).toFixed(2)}</strong></p>

            <p className="mt-2">
              You get paid <strong>{payPeriods}</strong> times per month.
            </p>

            <p>
              Estimated Monthly Income:{" "}
              <strong>£{(Number(income.amount) * payPeriods).toFixed(2)}</strong>
            </p>

            <p className="mt-2">
              Recommended to set aside per pay:{" "}
              <strong>£{perPaySetAside}</strong>
            </p>

            {!canAffordSetAside && (
              <p className="text-orange-500 mt-2">
                ⚠️ You only earn £{Number(income.amount).toFixed(2)} per pay. Setting aside £{perPaySetAside} isn't possible.
                Save what you can afford.
              </p>
            )}

            {hasShortfall && (
              <p className="mt-4 text-red-600 font-semibold">
                ⚠️ Warning: Your bills exceed your estimated income by £
                {shortfallAmount.toFixed(2)}
              </p>
            )}

            <button
              onClick={() => exportToCSV(income, bills)}
              className="bg-green-600 text-white px-4 py-2 rounded mt-4"
            >
              Export Budget as CSV
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
