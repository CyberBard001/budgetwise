import React, { useState, useEffect, useRef } from "react";
import MultipleIncomeForm from "./components/MultipleIncomeForm"; // <-- Use the new multi-income form
import BillsForm from "./components/BillsForm";
import BudgetChart from "./components/BudgetChart";
import { exportToCSV } from "./utils/exportToCSV";

const App = () => {
  const [income, setIncome] = useState(null);
  const [bills, setBills] = useState([]);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Step 1: Track active section and refs
  const [activeSection, setActiveSection] = useState("income");
  const sectionRefs = {
    income: useRef(null),
    bills: useRef(null),
    chart: useRef(null),
    summary: useRef(null),
  };

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

  // Step 2: IntersectionObserver for scrollspy
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: 0.4 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
    // eslint-disable-next-line
  }, []);

  const handleIncomeUpdate = (data) => setIncome(data);
  const handleBillsUpdate = (data) => setBills(data);

  // Multi-income: calculate total monthly income
  let totalMonthlyIncome = 0;
  if (Array.isArray(income)) {
    totalMonthlyIncome = income.reduce((sum, src) => {
      const freq =
        src.frequency === "weekly"
          ? 4
          : src.frequency === "biweekly"
          ? 2
          : src.frequency === "monthly"
          ? 1
          : 0;
      return sum + (Number(src.amount) * freq);
    }, 0);
  } else if (income && income.amount) {
    // fallback for single income
    totalMonthlyIncome =
      (income.frequency === "weekly"
        ? 4
        : income.frequency === "biweekly"
        ? 2
        : income.frequency === "monthly"
        ? 1
        : 0) * Number(income.amount);
  }

  const totalBills = bills.reduce(
    (sum, bill) => sum + (parseFloat(bill.amount) || 0),
    0
  );
  const payPeriods =
    Array.isArray(income) && income.length > 0
      ? Math.max(
          ...income.map((src) =>
            src.frequency === "weekly"
              ? 4
              : src.frequency === "biweekly"
              ? 2
              : src.frequency === "monthly"
              ? 1
              : 0
          )
        )
      : income?.frequency === "weekly"
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

  const canAffordSetAside =
    Array.isArray(income) && income.length > 0
      ? income.some((src) => Number(src.amount) >= parseFloat(perPaySetAside))
      : income?.amount >= parseFloat(perPaySetAside);
  const hasShortfall = totalMonthlyIncome < totalBills;
  const shortfallAmount = totalBills - totalMonthlyIncome;

  // Group bills by category for summary
  const groupedByCategory = bills.reduce((acc, bill) => {
    acc[bill.category] = acc[bill.category] + bill.amount || bill.amount;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-4">
      {/* Step 4: Sticky Top Navbar with ScrollSpy */}
      <header className="sticky top-0 z-50 bg-gray-200 dark:bg-gray-900 shadow p-3 flex gap-4 justify-center">
        {["income", "bills", "chart", "summary"].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className={`text-sm hover:underline ${
              activeSection === section
                ? "font-bold text-blue-700 dark:text-yellow-400"
                : "text-blue-600 dark:text-blue-400"
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        ))}
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

      {/* Step 3: Section refs */}
      <div id="income" ref={sectionRefs.income}>
        {/* <IncomeForm onIncomeUpdate={handleIncomeUpdate} /> */}
        <MultipleIncomeForm onIncomeUpdate={handleIncomeUpdate} />
      </div>
      <div id="bills" ref={sectionRefs.bills}>
        <BillsForm onBillsUpdate={handleBillsUpdate} />
      </div>

      {income && bills.length > 0 && (
        <>
          <div id="chart" ref={sectionRefs.chart}>
            <BudgetChart
              totalIncome={totalMonthlyIncome}
              totalBills={totalBills}
            />
          </div>
          <div
            id="summary"
            ref={sectionRefs.summary}
            className="bg-white dark:bg-gray-800 shadow p-4 rounded text-black dark:text-white"
          >
            <h2 className="text-lg font-semibold mb-2">Summary</h2>

            <p>
              Total Monthly Bills: <strong>£{totalBills.toFixed(2)}</strong>
            </p>
            <p>
              Estimated Monthly Income:{" "}
              <strong>£{totalMonthlyIncome.toFixed(2)}</strong>
            </p>
            <p className="mt-2">
              Recommended to set aside per pay: <strong>£{perPaySetAside}</strong>
            </p>

            {/* Category totals */}
            <div className="mt-4">
              <h3 className="font-semibold mb-1">Totals by Category:</h3>
              {Object.entries(groupedByCategory).map(([category, total]) => (
                <div key={category}>
                  <strong>{category}:</strong> £{total.toFixed(2)}
                </div>
              ))}
            </div>

            {!canAffordSetAside && (
              <p className="text-orange-500 mt-2">
                ⚠️ At least one income source is less than the recommended set aside per pay (£{perPaySetAside}). Save what you can afford.
              </p>
            )}

            {hasShortfall && (
              <p className="mt-4 text-red-600 font-semibold">
                ⚠️ Warning: Your bills exceed your estimated income by £
                {shortfallAmount.toFixed(2)}
              </p>
            )}

            {/* Monthly Net Position */}
            <p className="mt-4 flex items-center gap-2">
              Monthly Net Position:{" "}
              <strong
                className={`transition-colors duration-300 ${
                  totalMonthlyIncome - totalBills >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {totalMonthlyIncome - totalBills >= 0 ? "✅" : "⚠️"} £
                {(totalMonthlyIncome - totalBills).toFixed(2)}
                {totalMonthlyIncome - totalBills >= 0
                  ? " Surplus"
                  : " Deficit"}
              </strong>
            </p>

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
