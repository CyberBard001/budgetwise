export const exportToCSV = (income, bills) => {
    let csv = "Section,Field,Value\n";
  
    // Income section
    if (income) {
      csv += "Income,Amount," + income.amount + "\n";
      csv += "Income,Frequency," + income.frequency + "\n";
      csv += "Income,Next Payday," + income.nextPayDate + "\n";
    }
  
    // Bills section
    bills.forEach((bill) => {
      csv += `Bill,${bill.name},${bill.amount}\n`;
    });
  
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "budgetwise_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  