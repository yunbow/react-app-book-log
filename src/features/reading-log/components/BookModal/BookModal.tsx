import React, { useEffect } from 'react';
import { Book } from '../../types';
import { formatDate } from '../../../../utils';
import { Button } from '../../../../components/Button/Button';
import { Rating } from '../../../../components/Rating/Rating';
import styles from './BookModal.module.css';

interface BookModalProps {
  isOpen: boolean;
  book: Book | null;
  onClose: () => void;
  onEdit: (book: Book) => void;
  onDelete: (bookId: string) => void;
}

export const BookModal: React.FC<BookModalProps> = ({
  isOpen,
  book,
  onClose,
  onEdit,
  onDelete,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDelete = () => {
    if (book && window.confirm('この本を削除してもよろしいですか？')) {
      onDelete(book.id);
      onClose();
    }
  };

  const handleEdit = () => {
    if (book) {
      onEdit(book);
      onClose();
    }
  };

  if (!book) return null;

  const getPeriodText = (book: Book): string => {
    if (book.startDate && book.endDate) {
      return `${formatDate(book.startDate)} 〜 ${formatDate(book.endDate)}`;
    } else if (book.startDate) {
      return `${formatDate(book.startDate)} 〜 読書中`;
    } else {
      return '未設定';
    }
  };

  return (
    <div
      className={`${styles.modal} ${isOpen ? styles.open : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <h2 className={styles.modalTitle}>{book.title}</h2>
        <p><strong>著者:</strong> {book.author}</p>
        <p><strong>ジャンル:</strong> {book.genre}</p>
        <p><strong>読書期間:</strong> {getPeriodText(book)}</p>
        <p><strong>評価:</strong> <Rating value={book.rating} readonly /></p>
        <div className={styles.modalReview}>
          <h3>感想:</h3>
          <p>{book.review || '感想はありません。'}</p>
        </div>
        <div className={styles.modalButtons}>
          <Button onClick={handleEdit}>編集</Button>
          <Button variant="danger" onClick={handleDelete}>削除</Button>
        </div>
      </div>
    </div>
  );
};