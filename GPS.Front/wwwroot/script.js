document.addEventListener("DOMContentLoaded", () => {
    const rowsPerPageSelect = document.getElementById("rowsPerPage");
    const tableBody = document.getElementById("projectTableBody");
    const rows = tableBody.querySelectorAll("tr");
  
    function updateVisibleRows() {
      const limit = parseInt(rowsPerPageSelect.value);
      rows.forEach((row, index) => {
        row.style.display = index < limit ? "table-row" : "none";
      });
    }
  
    // Initialize view
    updateVisibleRows();
  
    // On dropdown change
    rowsPerPageSelect.addEventListener("change", updateVisibleRows);
  });
  