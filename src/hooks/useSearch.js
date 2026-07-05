import { useState, useMemo } from 'react';
import { useDebounce } from './useDebounce';

export function useSearch(data, searchFields, delay = 300) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, delay);

  const filteredData = useMemo(() => {
    if (!debouncedSearch || !data) return data || [];

    const lowerSearch = debouncedSearch.toLowerCase();
    return data.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        if (value == null) return false;
        return String(value).toLowerCase().includes(lowerSearch);
      })
    );
  }, [data, debouncedSearch, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    isSearching: searchTerm !== debouncedSearch
  };
}
