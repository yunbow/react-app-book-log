import { useState, useEffect, useCallback } from 'react';
import { Book } from './types';
import { loadBooks, saveBooks, showToast } from '../../utils';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBookId, setCurrentBookId] = useState<string | null>(null);

  useEffect(() => {
    const savedBooks = loadBooks();
    setBooks(savedBooks);
  }, []);

  const addBook = useCallback((book: Book) => {
    setBooks(prevBooks => {
      const newBooks = [...prevBooks, book];
      saveBooks(newBooks);
      return newBooks;
    });
    showToast('本が正常に保存されました！');
  }, []);

  const updateBook = useCallback((updatedBook: Book) => {
    setBooks(prevBooks => {
      const newBooks = prevBooks.map(book =>
        book.id === updatedBook.id ? updatedBook : book
      );
      saveBooks(newBooks);
      return newBooks;
    });
    showToast('本が更新されました！');
  }, []);

  const deleteBook = useCallback((bookId: string) => {
    setBooks(prevBooks => {
      const newBooks = prevBooks.filter(book => book.id !== bookId);
      saveBooks(newBooks);
      return newBooks;
    });
    showToast('本が削除されました！');
  }, []);

  const getBookById = useCallback((id: string): Book | undefined => {
    return books.find(book => book.id === id);
  }, [books]);

  return {
    books,
    currentBookId,
    setCurrentBookId,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
  };
};
