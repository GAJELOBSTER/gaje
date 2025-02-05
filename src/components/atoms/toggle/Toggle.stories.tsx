import type { Meta, StoryObj } from "@storybook/react";

import Toggle, { IToggleProps } from "./Toggle";
import { useState } from "react";

const meta = {
  component: Toggle,
  parameters: {
    controls: { include: ["size", "disabled", "label", "labelPosition"] as Array<keyof IToggleProps> },
  },
  args: {
    size: "large",
    label: "토글",
    labelPosition: "top",
    disabled: false,
  },
} satisfies Meta<typeof Toggle>;

export default meta;

const ToggleComponent = (args: IToggleProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  return <Toggle {...args} checked={checked} onChange={() => setChecked(!checked)} />;
};

export const Default: StoryObj<typeof Toggle> = {
  render: (args) => {
    return <ToggleComponent {...args} />;
  },
};
