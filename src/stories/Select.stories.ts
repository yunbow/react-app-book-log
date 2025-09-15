import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components/Select/Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const genreOptions = [
  { value: '小説', label: '小説' },
  { value: 'ビジネス', label: 'ビジネス' },
  { value: '自己啓発', label: '自己啓発' },
  { value: '科学', label: '科学' },
  { value: '歴史', label: '歴史' },
  { value: 'その他', label: 'その他' },
];

export const Default: Story = {
  args: {
    value: '小説',
    options: genreOptions,
  },
};

export const WithAllOption: Story = {
  args: {
    value: 'all',
    options: [
      { value: 'all', label: 'すべて' },
      ...genreOptions,
    ],
  },
};