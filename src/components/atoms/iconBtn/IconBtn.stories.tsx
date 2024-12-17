import type { Meta, StoryObj } from "@storybook/react";

import IconBtn, { IIconButtonProps } from "./IconBtn";
import SampleIcon from "@/assets/svg/SampleIcon.svg";

const meta = {
  component: IconBtn,
  parameters: {
    controls: { include: ["category", "size", "disabled"] as Array<keyof IIconButtonProps> },
  },
  args: {
    category: "solid",
    size: "medium",
    disabled: false,
    onClick: () => alert("클릭"),
  },
} satisfies Meta<typeof IconBtn>;

export default meta;

export const Default: StoryObj<typeof IconBtn> = {
  render: (args) => (
    <IconBtn {...args}>
      <SampleIcon className={`${args.category === "solid" ? "" : "[&_path]:fill-label-normal"}`} />
    </IconBtn>
  ),
};
