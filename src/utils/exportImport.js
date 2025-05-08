/**
 * Gather all relevant keys from localStorage,
 * stringify them into a pretty JSON blob.
 */
export function exportAllData() {
    // List every key your app uses
    const keys = [
      "income",
      "bills",
      "cashOnHand",
      "theme",
      "hasSeenTutorial"
    ];
    const data = {};
  
    keys.forEach((key) => {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        try {
          data[key] = JSON.parse(raw);
        } catch {
          // not JSON? store as-is
          data[key] = raw;
        }
      }
    });
  
    // Return pretty-printed JSON
    return JSON.stringify(data, null, 2);
  }
  
  /**
   * Takes a JSON string (matching exportAllData format),
   * writes each field back into localStorage.
   */
  export function importAllData(jsonStr) {
    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (err) {
      throw new Error("Invalid JSON: " + err.message);
    }
  
    Object.entries(parsed).forEach(([key, value]) => {
      // stringify non-string values
      const toStore = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(key, toStore);
    });
  }
  