import type { Meta, StoryObj } from "@storybook/react";

import Btn, { IButtonProps } from "@/components/common/Btn";
import LinkIcon from "@/assets/svg/Link";

const meta = {
  component: Btn,
  parameters: {
    layout: "centered",
    controls: { include: ["outline", "disabled", "size"] },
  },
  args: {
    size: "large",
  },
} satisfies Meta<typeof Btn>;

export default meta;

type Story = StoryObj<typeof Btn>;

type ColorType = {
  default: string;
  outline: string;
};

const DEFAULT_BUTTON_WIDTH = "132px";
const SMALL_BUTTON_WIDTH = "108px";

const colorData = {
  primary: { default: "white", outline: "#826AFF" },
  secondary: { default: "white", outline: "#2F355C" },
};

const StorybookBtnLayout = ({ args, color }: { args: IButtonProps; color: ColorType }) => {
  const width = args.size === "small" ? SMALL_BUTTON_WIDTH : DEFAULT_BUTTON_WIDTH;
  const linkIcon = <LinkIcon small={args.size === "small"} fill={args.outline ? color.outline : color.default} />;
  return (
    <div className="flex gap-3">
      <Btn {...args} width={width} />
      <Btn {...args} width={width} startIcon={linkIcon} />
      <Btn {...args} width={width} endIcon={linkIcon} />
    </div>
  );
};

export const Primary: Story = {
  render: (args) => <StorybookBtnLayout args={args} color={colorData.primary} />,
  args: {
    category: "primary",
    children: "Primary",
  },
};

export const Secondary: Story = {
  render: (args) => <StorybookBtnLayout args={args} color={colorData.secondary} />,
  args: {
    category: "secondary",
    children: "Secondary",
  },
};
