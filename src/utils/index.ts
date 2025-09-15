import { Book, FilterState, BookStats, MonthlyData } from '../features/reading-log/types';
import { LOCAL_STORAGE_KEY } from '../Config';

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return dateString; // Return original string if invalid date
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const weekday = weekdays[date.getDay()];

  return `${year}年${month}月${day}日 (${weekday})`;
};

export const getStarRating = (rating: number): string => {
  const fullStar = '★';
  const emptyStar = '☆';

  if (rating <= 0) return '評価なし';

  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? fullStar : emptyStar;
  }

  return stars;
};

export const generateId = (): string => {
  return Date.now().toString();
};

export const loadBooks = (): Book[] => {
  const savedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedBooks ? JSON.parse(savedBooks) : [];
};

export const saveBooks = (books: Book[]): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
};

export const filterBooks = (books: Book[], filterState: FilterState): Book[] => {
  const { search, genre } = filterState;

  return books.filter(book => {
    const matchesSearch = search === '' ||
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesGenre = genre === 'all' || book.genre === genre;

    return matchesSearch && matchesGenre;
  });
};

export const sortBooks = (books: Book[], sortBy: string): Book[] => {
  const sortedBooks = [...books];

  switch (sortBy) {
    case 'date-desc':
      return sortedBooks.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    case 'date-asc':
      return sortedBooks.sort((a, b) => new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime());
    case 'title':
      return sortedBooks.sort((a, b) => a.title.localeCompare(b.title, 'ja'));
    case 'rating-desc':
      return sortedBooks.sort((a, b) => b.rating - a.rating);
    case 'rating-asc':
      return sortedBooks.sort((a, b) => a.rating - b.rating);
    default:
      return sortedBooks;
  }
};

export const calculateStats = (books: Book[]): BookStats => {
  const totalBooks = books.length;

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  const booksThisMonth = books.filter(book => {
    if (!book.endDate) return false;
    const endDate = new Date(book.endDate);
    return endDate.getMonth() === thisMonth && endDate.getFullYear() === thisYear;
  }).length;

  const genreCounts: Record<string, number> = {};
  books.forEach(book => {
    genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
  });

  let topGenre = '-';
  let maxCount = 0;
  for (const genre in genreCounts) {
    if (genreCounts[genre] > maxCount) {
      maxCount = genreCounts[genre];
      topGenre = genre;
    }
  }

  const ratedBooks = books.filter(book => book.rating > 0);
  let averageRating = 0;
  if (ratedBooks.length > 0) {
    const sumRatings = ratedBooks.reduce((sum, book) => sum + book.rating, 0);
    averageRating = Number((sumRatings / ratedBooks.length).toFixed(1));
  }

  return {
    totalBooks,
    booksThisMonth,
    topGenre,
    averageRating,
  };
};

export const getMonthlyData = (books: Book[]): MonthlyData[] => {
  const months: MonthlyData[] = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const targetMonth = new Date(now);
    targetMonth.setMonth(now.getMonth() - i);

    const monthName = targetMonth.toLocaleDateString('ja-JP', { month: 'short' });
    const targetMonthIndex = targetMonth.getMonth();
    const targetYear = targetMonth.getFullYear();

    const count = books.filter(book => {
      if (!book.endDate) return false;
      const endDate = new Date(book.endDate);
      return endDate.getMonth() === targetMonthIndex && endDate.getFullYear() === targetYear;
    }).length;

    months.push({
      month: monthName,
      count,
    });
  }

  return months;
};

export const showToast = (message: string): void => {
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'rgba(92, 184, 92, 0.9)',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '4px',
    zIndex: '1000',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    transition: 'opacity 0.5s ease',
  });

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 3000);
};