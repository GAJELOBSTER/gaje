import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { IInteractiveBoxProps } from "@/components/common/InteractiveBox";
import Tooltip, { ITooltipProps } from "@/components/common/Tooltip";
import ErrorOn from "@/assets/svg/ErrorOn";
import Btn from "@/components/common/Btn";

type ITooltipStory = IInteractiveBoxProps & ITooltipProps;

const meta = {
  component: Tooltip,
  parameters: {
    layout: "centered",
    controls: {
      include: ["content", "color", "showCloseBtn", "arrowDirection", "arrowPosition"],
    },
  },
  args: {
    content: "Please enter a description",
    showCloseBtn: false,
    color: "dark",
    arrowDirection: "bottom",
    arrowPosition: 15,
  },
  argTypes: {
    color: { control: "select", options: ["dark", "light", "positive", "negative", "warning"] },
    arrowDirection: { control: "select", options: ["top", "left", "bottom", "right"] },
  },
} satisfies Meta<ITooltipStory>;

export default meta;

type Story = StoryObj<ITooltipStory>;

const TooltipHook = (args: ITooltipStory) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<any>({});

  const iconColor = args.color === "light" ? "#2A2F52" : "#FFF";

  useEffect(() => {
    let position = {};
    if (args.arrowDirection === "left") position = { x: 112, y: 15 };
    if (args.arrowDirection === "right") position = { x: -180, y: 15 };
    if (args.arrowDirection === "bottom") position = { x: 45, y: -44 };
    if (args.arrowDirection === "top") position = { x: 45, y: 48 };
    setPosition(position);
  }, [args.arrowDirection]);

  return (
    <div className="relative">
      <Tooltip
        {...args}
        position={position}
        startIcon={<ErrorOn className="inline align-text-bottom" fill={iconColor} />}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div onMouseOver={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        <Btn width={100}>Hover</Btn>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <TooltipHook {...args} />,
};
