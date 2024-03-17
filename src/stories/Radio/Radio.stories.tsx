import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Radio, { IRadioProps } from "@/components/common/Radio";

const meta = {
  component: Radio,
  parameters: {
    layout: "centered",
    controls: { include: [] },
  },
  args: { className: "flex gap-3" },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof Radio>;

const RADIO_DATA = [
  { value: "radio", label: "Radio Button Label" },
  { value: "radio2", label: "Radio Button Label" },
];

const RadioGroupHooks = ({ args, vertical }: { args: IRadioProps; vertical?: boolean }) => {
  const [checkedValue, setCheckedValue] = useState("");

  return (
    <div className={`${vertical && "flex-col"} flex items-start`}>
      <div className={`${vertical ? "flex-col gap-3" : "gap-7"} flex`}>
        {RADIO_DATA.map((data, index) => (
          <Radio
            {...args}
            key={data.value ?? index}
            label={data.label}
            value={data.value}
            checkedValue={checkedValue}
            setCheckedValue={setCheckedValue}
          />
        ))}
        <Radio {...args} label={"Radio Button Label"} disabled value={"disabled radio"} checkedValue={""} />
      </div>
    </div>
  );
};

const StorybookRadioLayout = (args: IRadioProps) => (
  <div>
    <div className="mb-11 flex flex-col items-center">
      <div className="typo-body3-sb mb-7 text-neutral-400">수평 배치</div>
      <RadioGroupHooks args={args} />
    </div>
    <div className="flex flex-col items-center">
      <div className="typo-body3-sb mb-7 text-neutral-400">수직 배치</div>
      <RadioGroupHooks args={args} vertical />
    </div>
  </div>
);

export const Default: Story = {
  render: (args) => <StorybookRadioLayout {...args} />,
};

export const Box: Story = {
  render: (args) => <StorybookRadioLayout {...args} />,
  args: {
    category: "box",
  },
};
