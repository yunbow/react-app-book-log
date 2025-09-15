import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from '../components/Rating/Rating';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
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

export const Interactive: Story = {
  args: {
    value: 3,
    readonly: false,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    readonly: true,
  },
};

export const NoRating: Story = {
  args: {
    value: 0,
    readonly: true,
  },
};

export const FullRating: Story = {
  args: {
    value: 5,
    readonly: true,
  },
};