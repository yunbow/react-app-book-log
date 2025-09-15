import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'ボタン',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'セカンダリ',
    variant: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    children: '削除',
    variant: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    children: '無効',
    disabled: true,
  },
};