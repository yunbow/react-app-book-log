import React from 'react';
import styles from './TextArea.module.css';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      rows={rows}
      className={[styles.textarea, className].filter(Boolean).join(' ')}
    />
  );
};