import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { MonthlyData } from '../../types';
import { CHART_CONFIG } from '../../../../Config';
import styles from './ReadingChart.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ReadingChartProps {
  monthlyData: MonthlyData[];
}

export const ReadingChart: React.FC<ReadingChartProps> = ({ monthlyData }) => {
  const chartRef = useRef<ChartJS<'bar'>>(null);

  const data = {
    labels: monthlyData.map(data => data.month),
    datasets: [
      {
        label: '読了した本の数',
        data: monthlyData.map(data => data.count),
        backgroundColor: CHART_CONFIG.backgroundColor,
        borderColor: CHART_CONFIG.borderColor,
        borderWidth: CHART_CONFIG.borderWidth,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '月別読書数',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Bar ref={chartRef} data={data} options={options} className={styles.canvas} />
    </div>
  );
};