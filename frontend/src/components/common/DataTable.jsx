function DataTable({ columns, rows, renderActions }) {
  if (rows.length === 0) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-reloop-espresso/15 text-sm text-reloop-espresso/45">
        No records to display.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-reloop-espresso/10 bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-reloop-espresso/10 bg-reloop-neutral/40">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-reloop-espresso/45"
              >
                {col.label}
              </th>
            ))}
            {renderActions && (
              <th className="px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-reloop-espresso/45">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-reloop-espresso/8">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-reloop-neutral/30">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-reloop-espresso/80">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {renderActions && (
                <td className="px-4 py-3">{renderActions(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
