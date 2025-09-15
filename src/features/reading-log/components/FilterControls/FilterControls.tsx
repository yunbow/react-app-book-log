import React from 'react';
import { Button } from '../../../../components/Button/Button';
import { Input } from '../../../../components/Input/Input';
import { Select } from '../../../../components/Select/Select';
import { FilterState } from '../../types';
import { GENRES, SORT_OPTIONS } from '../../../../Config';
import styles from './FilterControls.module.css';

interface FilterControlsProps {
  filterState: FilterState;
  onFilterChange: (filter: Partial<FilterState>) => void;
  onSearch: () => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filterState,
  onFilterChange,
  onSearch,
}) => {
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const genreOptions = [
    { value: 'all', label: 'すべて' },
    ...GENRES.map(genre => ({ value: genre, label: genre })),
  ];

  const sortOptions = SORT_OPTIONS.map(option => ({
    value: option.value,
    label: option.label,
  }));

  return (
    <div className={styles.filterControls}>
      <div className={styles.searchContainer}>
        <Input
          type="text"
          value={filterState.search}
          onChange={(value) => onFilterChange({ search: value })}
          onKeyDown={handleSearchKeyDown}
          placeholder="タイトルまたは著者で検索..."
          variant="search"
        />
        <Button onClick={onSearch} className={styles.searchButton}>
          検索
        </Button>
      </div>

      <div className={styles.filterContainer}>
        <label className={styles.label} htmlFor="filter-genre">ジャンルでフィルター:</label>
        <Select
          value={filterState.genre}
          onChange={(value) => onFilterChange({ genre: value as FilterState['genre'] })}
          options={genreOptions}
        />
      </div>

      <div className={styles.sortContainer}>
        <label className={styles.label} htmlFor="sort-by">並び替え:</label>
        <Select
          value={filterState.sortBy}
          onChange={(value) => onFilterChange({ sortBy: value as FilterState['sortBy'] })}
          options={sortOptions}
        />
      </div>
    </div>
  );
};