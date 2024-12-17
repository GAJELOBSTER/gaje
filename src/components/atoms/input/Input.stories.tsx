import type { Meta, StoryObj } from "@storybook/react";
import Input, { IInputProps } from "./Input";

const meta = {
  component: Input,
  parameters: {
    controls: { include: ["required", "error", "disabled", "size", "placeholder"] as Array<keyof IInputProps> },
  },
  args: {
    size: "medium",
    width: "240px",
    placeholder: "텍스트를 입력해주세요",
  },
} satisfies Meta<typeof Input>;

export default meta;

export const Default: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
};
