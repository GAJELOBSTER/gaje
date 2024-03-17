// React
import type { Meta, StoryObj } from "@storybook/react";

// Components
import Btn from "@/components/common/Btn";
import SampleModal from "@/components/modal/SampleModal";

const meta = {
  component: SampleModal,
  parameters: {
    layout: "centered",
    controls: { include: [] },
  },
} satisfies Meta<typeof SampleModal>;

export default meta;

type Story = StoryObj<typeof SampleModal>;

export const Sample: Story = {
  render: (_) => (
    <SampleModal>
      <Btn category="primary" size="large" width={120}>
        Open Modal
      </Btn>
    </SampleModal>
  ),
};
