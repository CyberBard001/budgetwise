// Utility functions

// 👉 NEW: helper that checks if a due date is within X days (default 7)
export function isDueSoon(dateString, windowDays = 7) {
  if (!dateString) return false;
  const today = new Date();
  const due = new Date(dateString);
  // Zero out the time for accurate day comparison
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  const diff = (due - today) / (1000 * 60 * 60 * 24); // days
  return diff >= 0 && diff <= windowDays;
}

// 👉 NEW: clears all BillWise keys from localStorage
export function clearBudgetData() {
  localStorage.removeItem("income");
  localStorage.removeItem("bills");
  localStorage.removeItem("cashOnHand");
  // keep theme so dark/light preference survives; comment out if you want full wipe
  // localStorage.removeItem("theme");
}
