import type { Meta, StoryObj } from "@storybook/react";
import LoginFormComponent from "@/components/LoginForm";

const meta = {
  component: LoginFormComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LoginFormComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoginForm: Story = {
  render: () => (
    <div className="[&_select]:hidden">
      <LoginFormComponent />
    </div>
  ),
};
