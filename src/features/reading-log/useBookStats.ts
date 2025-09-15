import { useState, useEffect } from 'react';
import { Book, BookStats, MonthlyData } from './types';
import { calculateStats, getMonthlyData } from '../../utils';

export const useBookStats = (books: Book[]) => {
  const [stats, setStats] = useState<BookStats>({
    totalBooks: 0,
    booksThisMonth: 0,
    topGenre: '-',
    averageRating: 0,
  });

  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    const newStats = calculateStats(books);
    const newMonthlyData = getMonthlyData(books);

    setStats(newStats);
    setMonthlyData(newMonthlyData);
  }, [books]);

  return { stats, monthlyData };
};
