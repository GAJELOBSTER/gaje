import type { Meta, StoryObj } from "@storybook/react";

import CheckBox, { ICheckBoxProps } from "./CheckBox";
import useCheckBox from "@/hooks/useCheckBox";

const meta = {
  component: CheckBox,
  parameters: {
    controls: { include: ["category", "size", "disabled", "label"] as Array<keyof ICheckBoxProps> },
  },
  args: {
    className: "w-max",
    size: "medium",
    disabled: false,
    category: "checkbox",
    label: "2번",
  },
} satisfies Meta<typeof CheckBox>;

export default meta;

const CheckBoxComponent = (args: ICheckBoxProps) => {
  const { checkBoxStateList, setCheckBoxStateList } = useCheckBox([{ value: 1 }, { value: 2 }]);
  return (
    <div className="flex flex-col gap-2">
      <CheckBox
        {...args}
        isAllCheckBox
        label="전체"
        disabled={false}
        checkBoxStateList={checkBoxStateList}
        setCheckBoxStateList={setCheckBoxStateList}
      />
      <CheckBox
        {...args}
        value={1}
        label="1번"
        disabled={false}
        checkBoxStateList={checkBoxStateList}
        setCheckBoxStateList={setCheckBoxStateList}
      />
      <CheckBox
        label="2번"
        {...args}
        value={2}
        checkBoxStateList={checkBoxStateList}
        setCheckBoxStateList={setCheckBoxStateList}
      />
    </div>
  );
};

export const Default: StoryObj<typeof CheckBox> = {
  render: (args) => {
    return <CheckBoxComponent {...args} />;
  },
};
