import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  type?: 'text' | 'date' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'search';
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  onKeyDown,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  variant = 'default',
}) => {
  const inputClass = [
    styles.input,
    variant === 'search' && styles.searchInput,
    className
  ].filter(Boolean).join(' ');

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={inputClass}
    />
  );
};