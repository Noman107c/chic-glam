'use client';

import React, { useState } from 'react';
import { Card, CardHeader } from '@/components/ui/Card';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  loading?: boolean;
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
    onPageChange: (page: number) => void;
  };
  onRowClick?: (row: T) => void;
  actions?: {
    label: string;
    onClick: (row: T) => void;
    variant?: 'primary' | 'danger' | 'secondary';
  }[];
}

export function DataTable<T extends { id: string }>(
  props: DataTableProps<T>
) {
  const {
    columns,
    data,
    title,
    loading = false,
    pagination,
    onRowClick,
    actions,
  } = props;
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: keyof T) => {
    if (sortBy === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
  };

  const isResponsive = data.length > 0;

  return (
    <Card>
      {title && <CardHeader title={title} />}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 ">
              {columns.map(column => (
                <th
                  key={String(column.key)}
                  className="px-4 py-3 text-left font-semibold text-gray-700 bg-gray-50 "
                  onClick={() => column.sortable && handleSort(column.key)}
                  style={{ width: column.width }}
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    {column.label}
                    {column.sortable && (
                      <span className="text-xs">
                        {sortBy === column.key ? (sortDir === 'asc' ? '↑' : '↓') : '⇅'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="px-4 py-3 text-left font-semibold text-gray-700  bg-gray-50 ">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-8 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              data.map(row => (
                <tr
                  key={row.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map(column => (
                    <td key={String(column.key)} className="px-4 py-3 text-gray-900" style={{ width: column.width }}>
                      {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {actions.map(action => (
                          <button
                            key={action.label}
                            onClick={e => {
                              e.stopPropagation();
                              action.onClick(row);
                            }}
                            className={`text-xs px-2 py-1 rounded transition-colors ${
                              action.variant === 'danger'
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            }`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && data.length > 0 && (
        <div className="flex justify-between items-center p-4 border-t border-gray-200">
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {Math.ceil(pagination.total / pagination.pageSize)} ({pagination.total} total)
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Previous
            </button>
            <button
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};
