const table = document.getElementById("dataTable");
const addRowBtn = document.getElementById("addRowBtn");
const addColumnBtn = document.getElementById("addColumnBtn");

// ======================
// ADD ROW
// ======================

addRowBtn.addEventListener("click", function () {
  const tbody = table.querySelector("tbody");
  const headerCells = table.querySelectorAll("thead th");

  const row = document.createElement("tr");

  // Data columns ko count karo
  for (let i = 0; i < headerCells.length - 1; i++) {
    const cell = document.createElement("td");

    cell.contentEditable = "true";

    row.appendChild(cell);
  }

  // Delete button cell
  const actionCell = document.createElement("td");

  const deleteButton = document.createElement("button");

  deleteButton.textContent = "Delete";

  deleteButton.classList.add("delete-row");

  actionCell.appendChild(deleteButton);

  row.appendChild(actionCell);

  tbody.appendChild(row);
});

// ======================
// ADD COLUMN
// ======================

addColumnBtn.addEventListener("click", function () {
  const columnName = prompt("Enter column name:");

  if (!columnName) {
    return;
  }

  // Header row
  const headerRow = table.querySelector("thead tr");

  // Action column last mein hai
  const actionHeader = headerRow.lastElementChild;

  // New header
  const th = document.createElement("th");
  th.textContent = columnName;

  // New column ko Action se PEHLE insert karo
  headerRow.insertBefore(th, actionHeader);

  // Har existing row mein new cell add karo
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach(function (row) {
    // Action cell last mein hai
    const actionCell = row.lastElementChild;

    const cell = document.createElement("td");

    cell.contentEditable = "true";

    // New cell ko Action se PEHLE insert karo
    row.insertBefore(cell, actionCell);
  });
});

// ======================

// ======================
// DOWNLOAD EXCEL
// ======================

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", function () {
  // Original table ki copy banao
  const tableCopy = table.cloneNode(true);

  // Action column remove karo
  const rows = tableCopy.querySelectorAll("tr");

  rows.forEach(function (row) {
    row.deleteCell(-1);
  });

  // Copy ko Excel worksheet mein convert karo
  const worksheet = XLSX.utils.table_to_sheet(tableCopy);

  // Workbook create karo
  const workbook = XLSX.utils.book_new();

  // Worksheet add karo
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  // Excel download
  XLSX.writeFile(workbook, "Finovo-Email-Sent.xlsx");
});

table.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-row")) {
    const row = event.target.closest("tr");

    row.remove();
  }
});
