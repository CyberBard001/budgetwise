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
    };

    const updated = [...incomeSources, newSource];
    setIncomeSources(updated);
    localStorage.setItem("incomeSources", JSON.stringify(updated));
    onIncomeUpdate(updated);

    setName("");
    setAmount("");
    setFrequency("monthly");
  };

  const handleDelete = (id) => {
    const updated = incomeSources.filter(source => source.id !== id);
    setIncomeSources(updated);
    localStorage.setItem("incomeSources", JSON.stringify(updated));
    onIncomeUpdate(updated);
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded dark:bg-blue-400 dark:text-black">
          Add Income
        </button>
      </form>

      <ul>
        {incomeSources.map((source) => (
          <li key={source.id} className="mb-2 flex justify-between items-center">
            <span>
              {source.name}: £{source.amount.toFixed(2)} ({source.frequency})
            </span>
            <button
              onClick={() => handleDelete(source.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeForm;
