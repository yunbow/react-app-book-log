import React from 'react';
import styles from './StatsCard.module.css';

interface StatsCardProps {
  title: string;
  value: string | number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => {
  return (
    <div className={styles.statCard}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};