// import type { Meta, StoryObj } from "@storybook/react";
// import { useState } from "react";

// import HidePassword from "@/assets/svg/HidePassword";
// import ShowPassword from "@/assets/svg/ShowPassword";
// import TextField, { ITextFieldProps } from "@/components/common/TextField";
// import useInput from "@/hooks/useInput";

// const meta = {
//   component: TextField,
//   parameters: {
//     layout: "centered",
//     controls: {
//       include: ["category", "multiline", "required", "readonly", "error", "disabled", "size", "helperText"],
//     },
//   },
//   args: {
//     category: "default",
//     size: "large",
//     width: "240px",
//   },
// } satisfies Meta<typeof TextField>;

// export default meta;

// type Story = StoryObj<typeof TextField>;

// const TextFieldHook = (args: ITextFieldProps) => {
//   const [isShow, setIsShow] = useState<boolean>(false);
//   const text = useInput();
//   const userPassword = useInput();

//   return (
//     <div className="flex gap-5">
//       <TextField
//         {...args}
//         value={text.value}
//         onChange={text.onChange}
//         label="텍스트"
//         placeholder="텍스트를 입력해주세요"
//       />
//       <TextField
//         {...args}
//         value={userPassword.value}
//         onChange={userPassword.onChange}
//         label="비밀번호"
//         placeholder="비밀번호를 입력해주세요"
//         type={isShow ? "text" : "password"}
//         endIcon={
//           <div className="cursor-pointer" onClick={() => setIsShow(!isShow)}>
//             {isShow ? <ShowPassword /> : <HidePassword />}
//           </div>
//         }
//       />
//     </div>
//   );
// };

// export const Default: Story = {
//   render: (args) => <TextFieldHook {...args} />,
//   args: {
//     category: "default",
//   },
// };
