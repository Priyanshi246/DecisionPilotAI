import { useState, useMemo } from 'react';

export function useSort(data, defaultField = null, defaultDirection = 'asc') {
  const [sortField, setSortField] = useState(defaultField);
  const [sortDirection, setSortDirection] = useState(defaultDirection);

  const sortedData = useMemo(() => {
    if (!data || !sortField) return data || [];

    return [...data].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sortDirection === 'asc' ? 1 : -1;
      if (bVal == null) return sortDirection === 'asc' ? -1 : 1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      const comparison = aStr.localeCompare(bStr);
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortField, sortDirection]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return {
    sortedData,
    sortField,
    sortDirection,
    toggleSort,
    setSortField,
    setSortDirection
  };
}
