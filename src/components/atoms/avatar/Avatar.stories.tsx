import type { Meta, StoryObj } from "@storybook/react";

import Avatar, { IAvatarProps } from "./Avatar";

const meta = {
  component: Avatar,
  parameters: {
    controls: { include: ["size"] as Array<keyof IAvatarProps> },
  },
  args: {
    size: "large",
  },
} satisfies Meta<typeof Avatar>;

export default meta;

export const Default: StoryObj<typeof Avatar> = {
  render: (args) => <Avatar {...args} image="/avatar_storybook_sample.png" />,
};
