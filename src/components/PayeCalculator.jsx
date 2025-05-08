// src/components/PayeCalculator.jsx
import React, { useState } from "react";
import { calculatePaye } from "../utils/payeUtils";

// Map our internal period keys to user-friendly labels & divisors
const PERIODS = {
  weekly:   { label: "Week",      divisor: 52  },
  biweekly: { label: "Fortnight", divisor: 26  },
  monthly:  { label: "Month",     divisor: 12  },
  yearly:   { label: "Year",      divisor: 1   },
};

const PayeCalculator = ({ onNetIncome }) => {
  const [mode, setMode] = useState("salary");            // "salary" or "hourly"
  const [salary, setSalary] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [pensionPercent, setPensionPercent] = useState(0);
  const [result, setResult] = useState(null);
  // New: which period to show
  const [payPeriod, setPayPeriod] = useState("monthly");

  const handleCalculate = () => {
    let grossAnnual = 0;
    if (mode === "salary") {
      grossAnnual = parseFloat(salary) || 0;
    } else {
      grossAnnual = (parseFloat(hourlyRate) || 0) * (parseFloat(hoursPerWeek) || 0) * 52;
    }
    const res = calculatePaye({ grossAnnual, pensionPercent });
    setResult(res);
    if (onNetIncome) onNetIncome(res.net);
  };

  // Compute per-period values if result exists
  let netAnnual = result ? result.net : 0;
  const { divisor, label } = PERIODS[payPeriod];
  const netThisPeriod = netAnnual / divisor;
  const netPerMonth = netAnnual / PERIODS.monthly.divisor;

  return (
    <div className="bg-white dark:bg-gray-800 shadow p-4 rounded mb-6">
      <h2 className="text-lg font-semibold mb-3">💷 PAYE Calculator</h2>

      {/* Mode switch */}
      <div className="flex gap-4 mb-3">
        <label className="flex items-center">
          <input
            type="radio"
            value="salary"
            checked={mode === "salary"}
            onChange={() => setMode("salary")}
            className="mr-1"
          />
          Annual Salary
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="hourly"
            checked={mode === "hourly"}
            onChange={() => setMode("hourly")}
            className="mr-1"
          />
          Hourly Rate
        </label>
      </div>

      {/* Inputs */}
      {mode === "salary" ? (
        <input
          type="number"
          placeholder="Gross Annual Salary (£)"
          value={salary}
          onChange={e => setSalary(e.target.value)}
          className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      ) : (
        <>
          <input
            type="number"
            placeholder="Hourly Rate (£)"
            value={hourlyRate}
            onChange={e => setHourlyRate(e.target.value)}
            className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          <input
            type="number"
            placeholder="Hours per Week"
            value={hoursPerWeek}
            onChange={e => setHoursPerWeek(e.target.value)}
            className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
        </>
      )}

      {/* Pension */}
      <input
        type="number"
        placeholder="Pension contribution (%)"
        value={pensionPercent}
        onChange={e => setPensionPercent(e.target.value)}
        className="w-full p-2 border rounded mb-2 bg-white dark:bg-gray-700 text-black dark:text-white"
      />

      {/* Pay Period Dropdown */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Pay Period:</label>
        <select
          value={payPeriod}
          onChange={e => setPayPeriod(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        >
          {Object.entries(PERIODS).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleCalculate}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>

      {/* Results */}
      {result && (
        <div className="mt-4 text-sm space-y-1">
          <div>Gross: £{result.gross.toFixed(2)}</div>
          <div>Pension: –£{result.pension.toFixed(2)}</div>
          <div>Taxable: £{result.taxable.toFixed(2)}</div>
          <div>Income Tax: –£{result.tax.toFixed(2)}</div>
          <div>NI: –£{result.ni.toFixed(2)}</div>
          <p className="font-semibold">
            Net per {label}: £{netThisPeriod.toFixed(2)}
          </p>
          <p>
            Net per Month: £{netPerMonth.toFixed(2)}
          </p>
          <p>
            Net per Year: £{netAnnual.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default PayeCalculator;
