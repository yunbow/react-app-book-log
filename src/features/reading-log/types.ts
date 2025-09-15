export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  startDate?: string;
  endDate?: string;
  rating: number;
  review?: string;
  addedAt: string;
}

export interface BookFormData {
  title: string;
  author: string;
  genre: string;
  startDate?: string;
  endDate?: string;
  rating: number;
  review?: string;
}

export type Genre = '小説' | 'ビジネス' | '自己啓発' | '科学' | '歴史' | 'その他';

export type FilterType = 'all' | Genre;

export type SortType = 'date-desc' | 'date-asc' | 'title' | 'rating-desc' | 'rating-asc';

export interface FilterState {
  search: string;
  genre: FilterType;
  sortBy: SortType;
}

export interface BookStats {
  totalBooks: number;
  booksThisMonth: number;
  topGenre: string;
  averageRating: number;
}

export interface MonthlyData {
  month: string;
  count: number;
}