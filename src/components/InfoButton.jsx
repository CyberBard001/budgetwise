import React from "react";

/**
 * Small circular “ⓘ” button that triggers a callback.
 * Props:
 *   onClick   — handler to run when the button is pressed
 *   label     — accessible label (defaults to "More info")
 */
const InfoButton = ({ onClick, label = "More info" }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="
      ml-2 inline-flex items-center justify-center
      w-5 h-5 rounded-full text-xs
      bg-blue-500 hover:bg-blue-600 text-white
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
    "
    title={label}
    type="button"
  >
    i
  </button>
);

export default InfoButton;
