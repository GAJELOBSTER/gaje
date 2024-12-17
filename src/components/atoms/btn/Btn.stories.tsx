import type { Meta, StoryObj } from "@storybook/react";

import Btn, { IBtnProps } from "./Btn";

const meta = {
  component: Btn,
  parameters: {
    controls: { include: ["category", "size", "variant", "disabled"] as Array<keyof IBtnProps> },
  },
  args: {
    category: "primary",
    size: "medium",
    variant: false,
    disabled: false,
  },
} satisfies Meta<typeof Btn>;

export default meta;

export const Default: StoryObj<typeof Btn> = {
  render: (args) => <Btn {...args}>확인</Btn>,
};
