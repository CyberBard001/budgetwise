import React, { useState, useEffect } from "react";

const frequencies = {
  weekly: 4,
  biweekly: 2,
  monthly: 1,
};

const IncomeForm = ({ onIncomeUpdate }) => {
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [nextPayDate, setNextPayDate] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("income"));
    if (stored) {
      setAmount(stored.amount || "");
      setFrequency(stored.frequency || "weekly");
      setNextPayDate(stored.nextPayDate || "");
      onIncomeUpdate(stored);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const incomeData = {
      amount: parseFloat(amount),
      frequency,
      nextPayDate,
    };
    localStorage.setItem("income", JSON.stringify(incomeData));
    onIncomeUpdate(incomeData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 shadow rounded mb-6 text-black dark:text-white">
      <h2 className="text-xl font-semibold mb-4">Income</h2>

      <label className="block mb-2">
        Amount (£):
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded mt-1 bg-white dark:bg-gray-700 text-black dark:text-white"
          required
        />
      </label>

      <label className="block mb-2">
        Frequency:
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full p-2 border rounded mt-1 bg-white dark:bg-gray-700 text-black dark:text-white"
        >
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>

      <label className="block mb-4">
        Next Payday:
        <input
          type="date"
          value={nextPayDate}
          onChange={(e) => setNextPayDate(e.target.value)}
          className="w-full p-2 border rounded mt-1 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </label>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded dark:bg-blue-400 dark:text-black">
        Save Income
      </button>
    </form>
  );
};

export default IncomeForm;

