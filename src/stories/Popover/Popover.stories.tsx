import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Popover, { IPopoverProps } from "@/components/common/Popover";
import Btn from "@/components/common/Btn";

const meta = {
  component: Popover,
  parameters: {
    layout: "centered",
    controls: {
      include: ["title", "content", "showCloseBtn", "color", "arrowDirection", "arrowPosition"],
    },
  },
  args: {
    title: "Title",
    content: "Please enter a description",
    showCloseBtn: false,
    color: "dark",
    arrowDirection: "bottom",
    arrowPosition: 30,
  },
  argTypes: {
    color: { control: "select", options: ["light", "dark"] },
    arrowDirection: { control: "select", options: ["top", "left", "bottom", "right"] },
  },
} satisfies Meta<IPopoverProps>;

export default meta;

type Story = StoryObj<IPopoverProps>;

const PopoverHook = (args: IPopoverProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<any>({});

  useEffect(() => {
    let position = {};
    if (args.arrowDirection === "left") position = { x: 112, y: 15 };
    if (args.arrowDirection === "right") position = { x: -172, y: 15 };
    if (args.arrowDirection === "bottom") position = { x: 45, y: -80 };
    if (args.arrowDirection === "top") position = { x: 45, y: 52 };
    setPosition(position);
  }, [args.arrowDirection]);

  return (
    <div className="">
      <Popover {...args} position={position} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Btn width={100} onClick={() => setIsOpen((before) => !before)}>
        Click
      </Btn>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <PopoverHook {...args} />,
};
