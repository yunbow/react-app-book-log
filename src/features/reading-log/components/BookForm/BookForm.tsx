import React, { useState, useEffect } from 'react';
import { Button } from '../../../../components/Button/Button';
import { Input } from '../../../../components/Input/Input';
import { Select } from '../../../../components/Select/Select';
import { TextArea } from '../../../../components/TextArea/TextArea';
import { Rating } from '../../../../components/Rating/Rating';
import { BookFormData, Genre } from '../../types';
import { GENRES } from '../../../../Config';
import { generateId } from '../../../../utils';
import styles from './BookForm.module.css';

interface BookFormProps {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData & { id: string; addedAt: string }) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

export const BookForm: React.FC<BookFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    genre: '小説',
    startDate: '',
    endDate: '',
    rating: 0,
    review: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      id: generateId(),
      addedAt: new Date().toISOString(),
    };

    onSubmit(submitData);

    if (!isEditing) {
      setFormData({
        title: '',
        author: '',
        genre: '小説',
        startDate: '',
        endDate: '',
        rating: 0,
        review: '',
      });
    }
  };

  const genreOptions = GENRES.map(genre => ({
    value: genre,
    label: genre,
  }));

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="title">タイトル:</label>
        <Input
          type="text"
          value={formData.title}
          onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="author">著者:</label>
        <Input
          type="text"
          value={formData.author}
          onChange={(value) => setFormData(prev => ({ ...prev, author: value }))}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="genre">ジャンル:</label>
        <Select
          value={formData.genre}
          onChange={(value) => setFormData(prev => ({ ...prev, genre: value as Genre }))}
          options={genreOptions}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="startDate">読み始めた日:</label>
        <Input
          type="date"
          value={formData.startDate || ''}
          onChange={(value) => setFormData(prev => ({ ...prev, startDate: value }))}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="endDate">読み終わった日:</label>
        <Input
          type="date"
          value={formData.endDate || ''}
          onChange={(value) => setFormData(prev => ({ ...prev, endDate: value }))}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>評価:</label>
        <Rating
          value={formData.rating}
          onChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="review">感想:</label>
        <TextArea
          value={formData.review || ''}
          onChange={(value) => setFormData(prev => ({ ...prev, review: value }))}
          rows={4}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Button type="submit" className={styles.submitButton}>
          {isEditing ? '更新' : '追加'}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            キャンセル
          </Button>
        )}
      </div>
    </form>
  );
};