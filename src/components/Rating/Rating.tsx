import React from 'react';
import styles from './Rating.module.css';

interface RatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  readonly = false,
  className = '',
}) => {
  if (readonly) {
    const getStarRating = (rating: number): string => {
      const fullStar = '★';
      const emptyStar = '☆';

      if (rating <= 0) return '評価なし';

      let stars = '';
      for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? fullStar : emptyStar;
      }

      return stars;
    };

    const displayClass = value <= 0 ? styles.noRating : styles.displayRating;

    return (
      <span className={[displayClass, className].filter(Boolean).join(' ')}>
        {getStarRating(value)}
      </span>
    );
  }

  if (!onChange) {
    return null;
  }

  return (
    <div className={[styles.ratingContainer, className].filter(Boolean).join(' ')}>
      {[5, 4, 3, 2, 1].map((rating) => (
        <React.Fragment key={rating}>
          <input
            type="radio"
            id={`star${rating}`}
            name="rating"
            value={rating}
            checked={value === rating}
            onChange={() => onChange(rating)}
          />
          <label htmlFor={`star${rating}`}>★</label>
        </React.Fragment>
      ))}
    </div>
  );
};