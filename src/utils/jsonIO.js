// src/utils/jsonIO.js
// ---------------------------------------------------------
// Tiny helper for exporting & importing BillWise data as JSON
// ---------------------------------------------------------

/**
 * Collect the three localStorage entries and trigger a download
 * named billwise-backup-YYYY-MM-DD.json
 */
export function exportToJSON() {
    const payload = {
      income:       JSON.parse(localStorage.getItem("income") || "null"),
      bills:        JSON.parse(localStorage.getItem("bills") || "[]"),
      cashOnHand:   localStorage.getItem("cashOnHand") ?? "",
      // NOTE: we purposely omit "theme" to avoid surprises on restore
    };
  
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href  = url;
    const ts   = new Date().toISOString().split("T")[0];
    link.download = `billwise-backup-${ts}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }
  
  /**
   * Receives a File (from <input type="file">) and loads its JSON
   * back into localStorage. Returns a Promise that resolves when done.
   */
  export function importFromJSON(file) {
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error("No file supplied"));
  
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.income !== undefined)
            localStorage.setItem("income", JSON.stringify(data.income));
          if (data.bills !== undefined)
            localStorage.setItem("bills", JSON.stringify(data.bills));
          if (data.cashOnHand !== undefined)
            localStorage.setItem("cashOnHand", data.cashOnHand);
  
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }
  