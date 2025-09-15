import React from 'react';
import { Book } from '../../types';
import { formatDate } from '../../../../utils';
import { Rating } from '../../../../components/Rating/Rating';
import styles from './BookCard.module.css';

interface BookCardProps {
  book: Book;
  onClick: (bookId: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const getDisplayDate = (book: Book): string => {
    if (book.endDate) {
      return formatDate(book.endDate);
    } else if (book.startDate) {
      return `${formatDate(book.startDate)} 〜 読書中`;
    } else {
      return '日付未設定';
    }
  };

  const handleClick = () => {
    onClick(book.id);
  };

  return (
    <div className={styles.bookCard} onClick={handleClick}>
      <div className={styles.bookCardHeader}>
        <h3>{book.title}</h3>
      </div>
      <div className={styles.bookCardBody}>
        <p><strong>著者:</strong> {book.author}</p>
        <p><strong>ジャンル:</strong> {book.genre}</p>
        <p className={styles.bookRating}>
          <Rating value={book.rating} readonly />
        </p>
        <p className={styles.bookDate}>{getDisplayDate(book)}</p>
      </div>
    </div>
  );
};