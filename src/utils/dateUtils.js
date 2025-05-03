// Simple helper to add days
export const addDays = (date, days) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  
  // Returns the next pay date AFTER 'today' for an income object
  export function getNextPayDate(income, today = new Date()) {
    if (!income.lastPaid) return null;
    const last = new Date(income.lastPaid);
    const freqDays =
      income.frequency === "weekly"   ? 7  :
      income.frequency === "biweekly" ? 14 :
      30; // monthly fallback
  
    let next = addDays(last, freqDays);
    // If lastPaid is in past but within same period, keep adding till it's future
    while (next <= today) next = addDays(next, freqDays);
    return next;
  }
  