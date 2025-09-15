import { useState, useCallback } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const openModal = useCallback((bookId?: string) => {
    if (bookId) setSelectedBookId(bookId);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedBookId(null);
  }, []);

  return {
    isOpen,
    selectedBookId,
    openModal,
    closeModal,
  };
};
