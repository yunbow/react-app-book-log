import type { Meta, StoryObj } from '@storybook/react';
import { BookCard } from '../../features/reading-log/components/BookCard/BookCard';
import { Book } from '../../features/reading-log/types';

const meta: Meta<typeof BookCard> = {
  title: 'Features/ReadingLog/Components/BookCard',
  component: BookCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleBook: Book = {
  id: '1',
  title: 'サンプル小説',
  author: '山田太郎',
  genre: '小説',
  startDate: '2024-01-01',
  endDate: '2024-01-15',
  rating: 4,
  review: 'とても面白い本でした。',
  addedAt: '2024-01-15T00:00:00.000Z',
};

export const Default: Story = {
  args: {
    book: sampleBook,
  },
};

export const Reading: Story = {
  args: {
    book: {
      ...sampleBook,
      endDate: undefined,
    },
  },
};

export const NoRating: Story = {
  args: {
    book: {
      ...sampleBook,
      rating: 0,
    },
  },
};

export const NoDates: Story = {
  args: {
    book: {
      ...sampleBook,
      startDate: undefined,
      endDate: undefined,
    },
  },
};