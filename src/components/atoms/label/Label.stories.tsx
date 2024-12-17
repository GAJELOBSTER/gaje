import type { Meta, StoryObj } from "@storybook/react";
import Label, { ILabelProps } from "./Label";

const meta = {
  component: Label,
  parameters: {
    controls: { include: ["text", "size", "required", "disabled"] as Array<keyof ILabelProps> },
  },
  args: {
    text: "레이블",
    size: "medium",
    required: false,
    disabled: false,
  },
} satisfies Meta<typeof Label>;

export default meta;

export const Default: StoryObj<typeof Label> = {
  render: (args) => <Label {...args} />,
};
