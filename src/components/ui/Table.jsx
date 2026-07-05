import { useState, useMemo } from 'react';
import { FiChevronUp, FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '../../utils/helpers';
import { useSort } from '../../hooks/useSort';
import { usePagination } from '../../hooks/usePagination';
import { useSearch } from '../../hooks/useSearch';

export function Table({ columns, data, loading, onRowClick }) {
  const { sortedData, sortField, sortDirection, toggleSort } = useSort(data);
  const { paginatedData, currentPage, totalPages, nextPage, prevPage, goToPage, hasNextPage, hasPrevPage } = usePagination(sortedData, 10);

  if (loading) {
    return (
      <div className="bg-dark-card/50 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
        <div className="grid gap-4 p-4 border-b border-white/10" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
          {columns.map((col, i) => (
            <div key={i} className="h-4 bg-white/10 rounded" />
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="grid gap-4 p-4 border-b border-white/5" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
            {columns.map((col, i) => (
              <div key={i} className="h-4 bg-white/5 rounded" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-dark-card/50 border border-white/10 rounded-2xl p-8 text-center">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-dark-card/50 border border-white/10 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-6 py-4 text-left text-sm font-semibold text-gray-400',
                    column.sortable && 'cursor-pointer hover:text-white transition-colors'
                  )}
                  onClick={() => column.sortable && toggleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && (
                      <div className="flex flex-col">
                        <FiChevronUp className={cn('w-3 h-3 -mb-1', sortField === column.key && sortDirection === 'asc' ? 'text-primary-400' : 'text-gray-600')} />
                        <FiChevronDown className={cn('w-3 h-3 -mt-1', sortField === column.key && sortDirection === 'desc' ? 'text-primary-400' : 'text-gray-600')} />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className={cn(
                  'border-b border-white/5 hover:bg-white/5 transition-colors',
                  onRowClick && 'cursor-pointer'
                )}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-sm text-gray-300">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
        <p className="text-sm text-gray-400">
          Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, data.length)} of {data.length} results
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={prevPage}
            disabled={!hasPrevPage}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={cn(
                  'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
                  currentPage === pageNum
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                )}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={nextPage}
            disabled={!hasNextPage}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 bg-dark-card/50 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
      />
    </div>
  );
}
