import type { Meta, StoryObj } from "@storybook/react";

import HelperText from "./HelperText";
import Input from "@/components/atoms/input/Input";

const meta = {
  component: HelperText,
  args: {
    text: "도움말 텍스트",
    size: "medium",
    disabled: false,
    error: false,
  },
} satisfies Meta<typeof HelperText>;

export default meta;

export const Default: StoryObj<typeof HelperText> = {
  render: (args) => <HelperText {...args} />,
};
