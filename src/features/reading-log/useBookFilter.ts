import { useState, useCallback } from 'react';
import { Book, FilterState } from './types';
import { filterBooks, sortBooks } from '../../utils';

export const useBookFilter = (books: Book[]) => {
  const [filterState, setFilterState] = useState<FilterState>({
    search: '',
    genre: 'all',
    sortBy: 'date-desc',
  });

  const filteredBooks = filterBooks(books, filterState);
  const sortedBooks = sortBooks(filteredBooks, filterState.sortBy);

  const updateFilter = useCallback((newFilter: Partial<FilterState>) => {
    setFilterState(prev => ({ ...prev, ...newFilter }));
  }, []);

  const resetFilter = useCallback(() => {
    setFilterState({
      search: '',
      genre: 'all',
      sortBy: 'date-desc',
    });
  }, []);

  return {
    filterState,
    filteredBooks: sortedBooks,
    updateFilter,
    resetFilter,
  };
};
