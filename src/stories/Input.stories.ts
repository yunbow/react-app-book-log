import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
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

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'テキストを入力してください',
    type: 'text',
  },
};

export const WithValue: Story = {
  args: {
    value: 'サンプルテキスト',
    placeholder: 'テキストを入力してください',
    type: 'text',
  },
};

export const DateInput: Story = {
  args: {
    value: '2025-01-01',
    type: 'date',
  },
};

export const SearchInput: Story = {
  args: {
    value: '',
    placeholder: '検索...',
    variant: 'search',
  },
};