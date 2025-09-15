import type { Meta, StoryObj } from '@storybook/react';
import { StatsCard } from '../../features/reading-log/components/StatsCard/StatsCard';

const meta: Meta<typeof StatsCard> = {
  title: 'Features/ReadingLog/Components/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TotalBooks: Story = {
  args: {
    title: '合計冊数',
    value: 42,
  },
};

export const ThisMonth: Story = {
  args: {
    title: '今月読んだ本',
    value: 3,
  },
};

export const TopGenre: Story = {
  args: {
    title: '最も読んだジャンル',
    value: '小説',
  },
};

export const AverageRating: Story = {
  args: {
    title: '平均評価',
    value: 4.2,
  },
};