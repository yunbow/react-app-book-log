import React, { useState } from 'react';
import { BookForm } from '../components/BookForm/BookForm';
import { FilterControls } from '../components/FilterControls/FilterControls';
import { BookCard } from '../components/BookCard/BookCard';
import { StatsCard } from '../components/StatsCard/StatsCard';
import { BookModal } from '../components/BookModal/BookModal';
import { ReadingChart } from '../components/ReadingChart/ReadingChart';
import { Book, BookFormData } from '../types';
import { useBooks } from '../useBooks';
import { useBookFilter } from '../useBookFilter';
import { useBookStats } from '../useBookStats';
import { useModal } from '../useModal';
import { generateId } from '../../../utils';
import styles from './ReadingLogApp.module.css';

export const ReadingLogApp: React.FC = () => {
  const {
    books,
    currentBookId,
    setCurrentBookId,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
  } = useBooks();

  const { filterState, filteredBooks, updateFilter } = useBookFilter(books);
  const { stats, monthlyData } = useBookStats(books);
  const { isOpen, selectedBookId, openModal, closeModal } = useModal();

  const [isEditing, setIsEditing] = useState(false);
  const [editingBook, setEditingBook] = useState<BookFormData | null>(null);

  const handleFormSubmit = (formData: BookFormData & { id: string; addedAt: string }) => {
    if (currentBookId) {
      const existingBook = getBookById(currentBookId);
      if (existingBook) {
        const updatedBook: Book = {
          ...formData,
          id: currentBookId,
          addedAt: existingBook.addedAt,
        };
        updateBook(updatedBook);
      }
      setCurrentBookId(null);
      setIsEditing(false);
      setEditingBook(null);
    } else {
      const newBook: Book = {
        ...formData,
        id: generateId(),
        addedAt: new Date().toISOString(),
      };
      addBook(newBook);
    }
  };

  const handleCardClick = (bookId: string) => {
    openModal(bookId);
  };

  const handleEditBook = (book: Book) => {
    const formData: BookFormData = {
      title: book.title,
      author: book.author,
      genre: book.genre,
      startDate: book.startDate,
      endDate: book.endDate,
      rating: book.rating,
      review: book.review,
    };

    setEditingBook(formData);
    setCurrentBookId(book.id);
    setIsEditing(true);

    const formSection = document.querySelector(`.${styles.section}`);
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDeleteBook = (bookId: string) => {
    deleteBook(bookId);
  };

  const handleCancelEdit = () => {
    setCurrentBookId(null);
    setIsEditing(false);
    setEditingBook(null);
  };

  const handleSearch = () => {
    // フィルタリングは既にuseBookFilterで処理されている
  };

  const selectedBook = selectedBookId ? getBookById(selectedBookId) || null : null;

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>読書記録</h1>
        </header>

        <main className={styles.main}>
          <section className={styles.section}>
            <h2>新しい本を{isEditing ? '編集' : '追加'}</h2>
            <BookForm
              initialData={editingBook || undefined}
              onSubmit={handleFormSubmit}
              onCancel={isEditing ? handleCancelEdit : undefined}
              isEditing={isEditing}
            />
          </section>

          <section className={styles.section}>
            <h2>読書リスト</h2>
            <FilterControls
              filterState={filterState}
              onFilterChange={updateFilter}
              onSearch={handleSearch}
            />
            <div className={styles.bookList}>
              {filteredBooks.length === 0 ? (
                <p className={styles.noBooks}>登録された本がありません。</p>
              ) : (
                filteredBooks.map(book => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={handleCardClick}
                  />
                ))
              )}
            </div>
          </section>

          <section className={`${styles.section} ${styles.statsSection}`}>
            <h2>読書統計</h2>
            <div className={styles.statsContainer}>
              <StatsCard title="合計冊数" value={stats.totalBooks} />
              <StatsCard title="今月読んだ本" value={stats.booksThisMonth} />
              <StatsCard title="最も読んだジャンル" value={stats.topGenre} />
              <StatsCard title="平均評価" value={stats.averageRating} />
            </div>
            <ReadingChart monthlyData={monthlyData} />
          </section>
        </main>

        <footer className={styles.footer}>
        </footer>
      </div>

      <BookModal
        isOpen={isOpen}
        book={selectedBook}
        onClose={closeModal}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
      />
    </div>
  );
};