import React, { useState, useEffect } from "react";

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

const BillsForm = ({ onBillsUpdate }) => {
  const [bills, setBills] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState(""); // Step 2: Add note state

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bills")) || [];
    setBills(stored);
    onBillsUpdate(stored);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !category) return;

    const newBill = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      category,
      note, // Step 2: Add note to bill object
    };

    const updatedBills = [...bills, newBill];
    setBills(updatedBills);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
    onBillsUpdate(updatedBills);

    setName("");
    setAmount("");
    setCategory("");
    setNote(""); // Step 2: Reset note
  };

  const handleDelete = (index) => {
    const updated = bills.filter((_, i) => i !== index);
    setBills(updated);
    localStorage.setItem("bills", JSON.stringify(updated));
    onBillsUpdate(updated);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded mb-6 text-black dark:text-white">
      <h2 className="text-xl font-semibold mb-4">Monthly Bills</h2>
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
        {/* Step 1: Add textarea for notes */}
        <textarea
          placeholder="Add a note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white resize"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded dark:bg-blue-400 dark:text-black">
          Add Bill
        </button>
      </form>

      <ul>
        {bills.map((bill, index) => (
          <li key={bill.id || index} className="mb-2 flex flex-col">
            <div className="flex justify-between items-center">
              <span>
                {bill.name}: £{Number(bill.amount).toFixed(2)}
                <span className="ml-2 text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-800">
                  {bill.category}
                </span>
              </span>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
            {/* Step 3: Display note if present */}
            {bill.note && (
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 ml-2">
                📝 {bill.note}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillsForm;
