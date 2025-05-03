import React, { useState, useEffect } from "react";
import { isDueSoon } from "../utils/budgetUtils"; // <-- Add this import

const categoryOptions = [
  "Housing",
  "Utilities",
  "Debt",
  "Groceries",
  "Transport",
  "Healthcare",
  "Childcare",
  "Entertainment",
  "Dining Out",
  "Shopping",
  "Subscriptions",
  "Other",
];

// 🎨 decide badge colours by bill type
const getTypeClasses = (type) => {
  switch (type) {
    case "Essential":
      return "bg-green-200 text-green-800";
    case "Flexible":
      return "bg-amber-200 text-amber-800";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

// Add frequency and daily scope options
const frequencyOptions = ["daily", "weekly", "biweekly", "monthly"];

const dailyScopeOptions = [
  { value: "daily-weekdays", label: "Weekdays (Mon‑Fri)" },
  { value: "daily-weekends", label: "Weekends (Sat‑Sun)" },
  { value: "daily-both", label: "Both / Every day" },
];

const BillsForm = ({ onBillsUpdate, billsWithWarnings = [] }) => {
  const [bills, setBills] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [actualAmount, setActualAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState(""); // 🟨 Step 1: Add type state
  const [note, setNote] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [dailyScope, setDailyScope] = useState("daily-weekdays"); // default if needed

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bills")) || [];
    setBills(stored);
    onBillsUpdate(stored);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !category || !type) return;

    const newBill = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      actualAmount: actualAmount ? parseFloat(actualAmount) : null,
      category,
      type, // 🟩 Step 3: Add type to bill object
      note,
      dueDate,
      frequency: frequency === "daily" ? dailyScope : frequency, // <-- key change
    };

    const updatedBills = [...bills, newBill];
    setBills(updatedBills);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
    onBillsUpdate(updatedBills);

    setName("");
    setAmount("");
    setActualAmount("");
    setCategory("");
    setType(""); // 🟩 Reset type after submit
    setNote("");
    setDueDate("");
    setFrequency("monthly"); // Reset frequency
  };

  const handleDelete = (index) => {
    const updated = bills.filter((_, i) => i !== index);
    setBills(updated);
    localStorage.setItem("bills", JSON.stringify(updated));
    onBillsUpdate(updated);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded mb-6 text-black dark:text-white">
      <h2 className="text-xl font-semibold mb-4">Outgoings</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Bill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <input
          type="number"
          placeholder="Amount (£)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <input
          type="number"
          placeholder="Actual Amount (£) (optional)"
          value={actualAmount}
          onChange={(e) => setActualAmount(e.target.value)}
          className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
          required
        >
          <option value="">Select Category</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {/* 🟦 Step 2: Type dropdown */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
          required
        >
          <option value="">Select Type</option>
          <option value="Essential">Essential</option>
          <option value="Flexible">Flexible</option>
        </select>
        <textarea
          placeholder="Add a note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white resize"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        {/* Frequency dropdown above Add Bill button */}
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
          required
        >
          {frequencyOptions.map(f => (
            <option key={f} value={f}>{f.charAt(0).toUpperCase()+f.slice(1)}</option>
          ))}
        </select>

        {/* Conditionally show scope dropdown when Daily chosen */}
        {frequency === "daily" && (
          <select
            value={dailyScope}
            onChange={e => setDailyScope(e.target.value)}
            className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
          >
            {dailyScopeOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        )}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded dark:bg-blue-400 dark:text-black">
          Add Bill
        </button>
      </form>

      <ul>
        {billsWithWarnings.map((bill, index) => (
          <li key={bill.id || index} className="mb-2 flex flex-col">
            <div className="flex justify-between items-center">
              <span>
                {bill.name}: £{Number(bill.amount).toFixed(2)}
                <span className="text-xs text-gray-500 ml-2">
                  ({bill.frequency || "monthly"})
                </span>
                <span className="ml-2 text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-800">
                  {bill.category}
                </span>
                {/* Type badge with new color helper */}
                <span
                  className={`ml-2 text-xs px-2 py-1 rounded ${getTypeClasses(bill.type)}`}
                >
                  {bill.type}
                </span>
                {/* 🔔 Due Soon badge */}
                {isDueSoon(bill.dueDate) && (
                  <span className="ml-2 text-xs px-2 py-1 rounded bg-yellow-200 text-yellow-800">
                    🔔 Due Soon
                  </span>
                )}
              </span>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
            {/* Show cash warning if needed */}
            {bill.needsCashWarning && (
              <div className="text-xs text-red-600 ml-2">
                ⚠️ Short £{bill.shortBy} before {bill.dueDate}
              </div>
            )}
            {bill.actualAmount != null && (
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 ml-2">
                🧾 Actual Spent: £{bill.actualAmount.toFixed(2)}
              </div>
            )}
            {bill.note && (
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 ml-2">
                📝 {bill.note}
              </div>
            )}
            {bill.dueDate && (
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 ml-2">
                📅 Due: {bill.dueDate}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillsForm;
