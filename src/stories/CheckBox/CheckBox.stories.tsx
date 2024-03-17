import { Meta, StoryObj } from "@storybook/react";

import CheckBox from "@/components/common/CheckBox";
import useCheckBox from "@/hooks/useCheckBox";

const meta = {
  component: CheckBox,
  parameters: {
    layout: "centered",
    controls: { include: [] },
  },
  args: { className: "flex gap-3" },
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof CheckBox>;

const CHECKBOX_DATA = [
  { index: 1, value: "CheckboxLabel", name: "Checkbox Label" },
  { index: 2, value: "CheckboxLabel2", name: "Checkbox Label" },
  { index: 3, value: "CheckboxLabel3", name: "Checkbox Label" },
];

const CheckBoxHooks = ({ args, vertical }: { args: any; vertical?: boolean }) => {
  const [checkBoxStateList, setCheckBoxStateList] = useCheckBox(CHECKBOX_DATA);

  return (
    <div className={`${vertical && "flex-col"} flex items-start`}>
      {vertical && (
        <CheckBox
          {...args}
          className={`${vertical ? "mb-7" : "mr-7"}`}
          label="전체선택"
          isAllCheckBox
          checkBoxStateList={checkBoxStateList}
          setCheckBoxStateList={setCheckBoxStateList}
        />
      )}
      <div className={`${vertical ? "flex-col gap-3" : "gap-7"} flex`}>
        {CHECKBOX_DATA.map((data, index) => (
          <CheckBox
            {...args}
            key={data.index ?? index}
            label={data.name}
            value={index}
            checkBoxStateList={checkBoxStateList}
            setCheckBoxStateList={setCheckBoxStateList}
          />
        ))}
        <CheckBox {...args} disabled label="Checkbox Label" checkBoxStateList={{}} />
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => (
    <div>
      <div className="mb-11 flex flex-col items-center">
        <div className="typo-body3-sb mb-7 text-neutral-400">수평 배치</div>
        <CheckBoxHooks args={args} />
      </div>
      <div className="flex flex-col items-center">
        <div className=" typo-body3-sb mb-7 text-neutral-400">수직 배치</div>
        <CheckBoxHooks args={args} vertical />
      </div>
    </div>
  ),
};
