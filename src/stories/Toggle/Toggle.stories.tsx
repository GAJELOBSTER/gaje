// React
import type { Meta, StoryObj } from "@storybook/react";

// Components
import Toggle, { IToggleProps } from "@/components/common/Toggle";
import { useState } from "react";

const meta = {
  component: Toggle,
  parameters: {
    layout: "centered",
    controls: { include: ["size", "disabled", "label", "labelPosition"] },
  },
  args: {
    size: "large",
    label: "Label",
    labelPosition: "top",
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof Toggle>;

const ToggleHook = (args: IToggleProps) => {
  const [checked, setChecked] = useState<boolean>(true);

  return <Toggle {...args} checked={checked} onChange={() => setChecked(!checked)} />;
};

export const Default: Story = {
  render: (args) => <ToggleHook {...args}></ToggleHook>,
};
