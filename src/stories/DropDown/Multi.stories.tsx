import type { Meta, StoryObj } from "@storybook/react";

import MultiDropDown, { IMultiDropDownProps } from "@/components/common/MultiDropDown";
import useCheckBox from "@/hooks/useCheckBox";

const meta = {
  component: MultiDropDown,
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
} satisfies Meta<typeof MultiDropDown>;

export default meta;

type Story = StoryObj<typeof MultiDropDown>;

const DROPBOX_WIDTH = 200;
const DROPBOX_DATA = new Array(10)
  .fill({})
  .map((_, index) => ({ index: index + 1, value: `Option ${index + 1}`, isDisabled: index === 2 ? true : false }));

const MultiDropDownHooks = (args: IMultiDropDownProps) => {
  const [checkBoxStateList, setCheckBoxStateList] = useCheckBox(DROPBOX_DATA);

  return (
    <MultiDropDown
      {...args}
      label="Label"
      width={DROPBOX_WIDTH}
      data={DROPBOX_DATA}
      checkBoxStateList={checkBoxStateList}
      setCheckBoxStateList={setCheckBoxStateList}
    />
  );
};

export const Multi: Story = {
  render: (args) => <MultiDropDownHooks {...args} />,
};
