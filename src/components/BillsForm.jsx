import React, { useState, useEffect } from "react";

const BillsForm = ({ onBillsUpdate }) => {
  const [bills, setBills] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("essential");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bills")) || [];
    setBills(stored);
    onBillsUpdate(stored);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBill = { name, amount: parseFloat(amount), type };
    const updatedBills = [...bills, newBill];
    setBills(updatedBills);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
    onBillsUpdate(updatedBills);
    setName("");
    setAmount("");
    setType("essential");
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
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
        >
          <option value="essential">Essential</option>
          <option value="flexible">Flexible</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded dark:bg-blue-400 dark:text-black">
          Add Bill
        </button>
      </form>

      <ul>
        {bills.map((bill, index) => (
          <li key={index} className="mb-2 flex justify-between items-center">
            <span>
              {bill.name}: £{bill.amount.toFixed(2)}{" "}
              <span
                className={`ml-2 text-sm font-semibold px-2 py-1 rounded ${
                  bill.type === "essential"
                    ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                }`}
              >
                {bill.type}
              </span>
            </span>
            <button
              onClick={() => handleDelete(index)}
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

export default BillsForm;
