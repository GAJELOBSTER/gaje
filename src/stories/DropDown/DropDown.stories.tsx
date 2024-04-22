import type { Meta, StoryObj } from "@storybook/react";

import DropDown, { IDropDownProps } from "@/components/common/DropDown";
import { useState } from "react";

const meta = {
  component: DropDown,
  parameters: {
    layout: "centered",
    controls: {
      include: ["size", "category", "labelPosition", "readonly", "error", "placeHolder", "helperText"],
    },
  },
  args: {
    size: "large",
    category: "default",
    placeHolder: "Placeholder",
    helperText: "Helper Text",
    labelPosition: "vertical",
  },
} satisfies Meta<typeof DropDown>;

export default meta;

type Story = StoryObj<typeof DropDown>;

const DROPBOX_WIDTH = 200;
const DROPBOX_DATA = new Array(10)
  .fill({})
  .map((_, index) => ({ index: index + 1, value: `Option ${index + 1}`, isDisabled: index === 2 ? true : false }));

const DropBoxHooks = (args: IDropDownProps) => {
  type CheckedDataType = {
    index: number;
    value: string;
    isDisabled: boolean;
  };
  const [checkedData, setCheckedData] = useState<CheckedDataType>(DROPBOX_DATA[0]);

  return (
    <DropDown
      {...args}
      label="Label"
      width={DROPBOX_WIDTH}
      data={DROPBOX_DATA}
      checkedData={checkedData}
      setCheckedData={setCheckedData}
    />
  );
};

export const Default: Story = {
  render: (args) => <DropBoxHooks {...args} />,
};
