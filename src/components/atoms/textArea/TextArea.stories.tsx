import type { Meta, StoryObj } from "@storybook/react";
import TextArea, { ITextAreaProps } from "./TextArea";

const meta = {
  component: TextArea,
  parameters: {
    controls: { include: ["size", "placeholder", "disabled", "error"] as Array<keyof ITextAreaProps> },
  },
  args: {
    size: "medium",
    width: "240px",
    placeholder: "텍스트를 입력해주세요",
  },
} satisfies Meta<typeof TextArea>;

export default meta;

export const Default: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
};
