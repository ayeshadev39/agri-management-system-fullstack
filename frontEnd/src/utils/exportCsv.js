export const exportToCsv = (filename, rows, columns) => {
  if (!rows || !rows.length) {
    alert("No data to export");
    return;
  }

  const headers = columns.map((c) => c.label).join(",");
  const data = rows
    .map((row) =>
      columns
        .map((col) => {
          let val = row[col.key];
          if (val === null || val === undefined) val = "";
          val = String(val).replace(/"/g, '""');
          if (val.includes(",") || val.includes('"') || val.includes("\n")) {
            val = `"${val}"`;
          }
          return val;
        })
        .join(",")
    )
    .join("\n");

  const csv = `${headers}\n${data}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}_${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};