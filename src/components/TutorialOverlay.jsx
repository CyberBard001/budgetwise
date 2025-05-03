// src/components/TutorialOverlay.jsx
import React from "react";

/**
 * Very‑first skeleton of the on‑boarding tutorial.
 * ▸ Accepts an array of steps, a current‑step index, and “next / close” callbacks.
 * ▸ Renders a semi‑transparent backdrop + a centred card.
 */
const TutorialOverlay = ({ steps, stepIndex, onNext, onClose }) => {
  if (!steps?.length || stepIndex == null) return null;

  const { title, body } = steps[stepIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg text-black dark:text-white">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-4">{body}</p>

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-600"
            onClick={onClose}
          >
            Skip
          </button>

          <button
            className="px-3 py-1 rounded bg-blue-600 text-white"
            onClick={onNext}
          >
            {stepIndex === steps.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;
