"use client";

interface BenchmarkTableProps {
  caption?: string;
  headers: string[];
  rows: { cells: string[]; highlight?: boolean }[];
}

export function BenchmarkTable({ caption, headers, rows }: BenchmarkTableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        {caption && (
          <caption className="px-4 py-3 text-xs font-medium text-gray-500 text-left bg-gray-50 border-b border-gray-200">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap ${i === 0 ? "sticky left-0 bg-gray-50 z-10" : ""}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`border-b border-gray-100 last:border-0 ${row.highlight ? "bg-violet/5 font-medium" : ""}`}
            >
              {row.cells.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-3 whitespace-nowrap ${ci === 0 ? "sticky left-0 z-10 font-medium text-foreground" : "text-gray-600"} ${ci === 0 && row.highlight ? "bg-violet/5" : ci === 0 ? "bg-white" : ""}`}
                >
                  <span dangerouslySetInnerHTML={{ __html: cell }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
