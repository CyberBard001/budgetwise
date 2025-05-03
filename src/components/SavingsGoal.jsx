// src/components/SavingsGoal.jsx
import React, { useState, useEffect } from "react";

/**
 *  A lightweight savings‑goal widget.
 *  • Persists to localStorage under “savingsGoal” (target) and “savedSoFar”.
 *  • Emits onGoalUpdate(newSavedAmount) via prop when the saved value changes
 *    so the parent can refresh the net‑position display later.
 *  • Now also accepts `surplus` (number of £ that can be swept in)
 */
const SavingsGoal = ({ surplus = 0, onGoalUpdate = () => {} }) => {
  // Load or initialise state
  const [goal, setGoal] = useState(
    () => JSON.parse(localStorage.getItem("savingsGoal")) || { name: "", target: 0 }
  );
  const [saved, setSaved] = useState(
    () => Number(localStorage.getItem("savedSoFar") || 0)
  );

  // Persist whenever goal or saved changes
  useEffect(() => {
    localStorage.setItem("savingsGoal", JSON.stringify(goal));
  }, [goal]);

  useEffect(() => {
    localStorage.setItem("savedSoFar", saved);
    onGoalUpdate(saved);          // notify parent
  }, [saved]);

  const progress = goal.target > 0 ? Math.min(saved / goal.target, 1) : 0;

  return (
    <div className="bg-white dark:bg-gray-800 shadow p-4 rounded mb-6">
      <h2 className="text-lg font-semibold mb-2">🎯 Savings Goal</h2>

      {/* Goal setup */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Goal name (e.g. Emergency Fund)"
          value={goal.name}
          onChange={(e) => setGoal({ ...goal, name: e.target.value })}
          className="flex-1 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <input
          type="number"
          placeholder="Target £"
          value={goal.target}
          onChange={(e) => setGoal({ ...goal, target: Number(e.target.value) })}
          className="w-32 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </div>

      {/* Progress bar */}
      {goal.target > 0 && (
        <>
          <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded overflow-hidden mb-2">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="text-sm mb-3">
            Saved £{saved.toFixed(2)} / £{goal.target}
            {" "}({(progress * 100).toFixed(1)}%)
          </p>

          {/* Quick add */}
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              placeholder="+ Add £"
              className="flex-1 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const amt = Number(e.currentTarget.value);
                  if (amt > 0) {
                    setSaved((prev) => prev + amt);
                    e.currentTarget.value = "";
                  }
                }
              }}
            />
            <button
              onClick={() => {
                if (window.confirm("Reset saved amount to £0?")) setSaved(0);
              }}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Reset
            </button>
          </div>

          {/* ── Add *entire* monthly surplus quick‑save ── */}
          {surplus > 0 && (
            <button
              onClick={() => {
                const newSaved = saved + surplus;
                setSaved(newSaved);
                localStorage.setItem("savedSoFar", newSaved);
                onGoalUpdate?.(newSaved);       // notify parent if provided
              }}
              className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
              title={`Move £${surplus.toFixed(2)} surplus into goal`}
            >
              Save Monthly Surplus (£{surplus.toFixed(0)})
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SavingsGoal;
