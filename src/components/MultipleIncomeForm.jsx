import React, { useState, useEffect } from "react";

const frequencyMap = {
  weekly: 4,
  biweekly: 2,
  monthly: 1,
};

const IncomeForm = ({ onIncomeUpdate }) => {
  const [incomeSources, setIncomeSources] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [lastPaid, setLastPaid] = useState(""); // 1. Add state for last pay date

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("incomeSources")) || [];
    setIncomeSources(stored);
    onIncomeUpdate(stored);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !frequency) return;

    const newSource = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      frequency,
      lastPaid, // 3. Add lastPaid to object
    };

    const updated = [...incomeSources, newSource];
    setIncomeSources(updated);
    localStorage.setItem("incomeSources", JSON.stringify(updated));
    onIncomeUpdate(updated);

    setName("");
    setAmount("");
    setFrequency("monthly");
    setLastPaid(""); // Reset lastPaid
  };

  const handleDelete = (id) => {
    const updated = incomeSources.filter(source => source.id !== id);
    setIncomeSources(updated);
    localStorage.setItem("incomeSources", JSON.stringify(updated));
    onIncomeUpdate(updated);
  };

  // 4. Helper to calculate next pay date
  const getNextPayDate = (lastDate, frequency) => {
    const date = new Date(lastDate);
    if (isNaN(date)) return "—";
    const daysToAdd =
      frequency === "weekly"
        ? 7
        : frequency === "biweekly"
        ? 14
        : frequency === "monthly"
        ? 30
        : 0;
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded mb-6 text-black dark:text-white">
      <h2 className="text-xl font-semibold mb-4">Income Sources</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Source Name"
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
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
        >
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
          <option value="monthly">Monthly</option>
        </select>
        {/* 2. Add a date input for last paid */}
        <label className="text-sm mb-1 block">Last Paid (optional)</label>
        <input
          type="date"
          value={lastPaid}
          onChange={(e) => setLastPaid(e.target.value)}
          className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded dark:bg-blue-400 dark:text-black">
          Add Income
        </button>
      </form>

      <ul>
        {incomeSources.map((source) => (
          <li key={source.id} className="mb-2 flex flex-col">
            <div className="flex justify-between items-center">
              <span>
                {source.name}: £{source.amount.toFixed(2)} ({source.frequency})
              </span>
              <button
                onClick={() => handleDelete(source.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
            {/* 4. Show next expected pay date if lastPaid provided */}
            {source.lastPaid && (
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 ml-2">
                📆 Next Expected Pay: {getNextPayDate(source.lastPaid, source.frequency)}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeForm;
