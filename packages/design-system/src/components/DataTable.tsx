/**
 * DataTable - Generic data table component
 * =========================================
 * Rationale: Provides a consistent, typed table component used across
 * all three products. Supports column definitions with custom renderers,
 * making it reusable for campaign tables (Media Buyer), query results
 * (Analytics Copilot), and checklist views (Finance OS).
 *
 * Props:
 *   columns: Column definitions with header, accessor, and optional render
 *   data: Array of row objects
 *   emptyMessage: Text shown when data is empty
 */
import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  const alignClass = (align?: string) => {
    if (align === 'center') return 'text-center';
    if (align === 'right') return 'text-right';
    return 'text-left';
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className={`px-4 py-3 font-medium text-gray-500 ${alignClass(col.align)}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={String(col.accessor)}
                    className={`px-4 py-3 ${alignClass(col.align)}`}
                  >
                    {col.render
                      ? col.render(row[col.accessor], row)
                      : String(row[col.accessor] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
