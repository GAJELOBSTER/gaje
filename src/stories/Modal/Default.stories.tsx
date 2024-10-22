// // React
// import { useState } from "react";
// import type { Meta, StoryObj } from "@storybook/react";

// // Components
// import Btn from "@/components/common/Btn";
// import Modal, { ICommonModalProps } from "@/components/common/Modal";

// interface IModalStory extends ICommonModalProps {
//   subBtn?: string;
//   title?: string;
//   contents?: string;
// }

// const meta = {
//   component: Modal,
//   parameters: {
//     layout: "centered",
//     controls: { include: ["size", "showCloseBtn", "subBtn", "title", "contents"] },
//   },
//   args: { size: "small", title: "Title", contents: "Contents" },
//   argTypes: {
//     subBtn: { control: "boolean" },
//     contents: { control: "text" },
//   },
// } satisfies Meta<IModalStory>;

// export default meta;

// type Story = StoryObj<IModalStory>;

// const ModalHook = (args: IModalStory) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const onClose = () => setIsOpen(false);
//   return (
//     <>
//       <Modal size={args.size} showCloseBtn={args.showCloseBtn} isOpen={isOpen} onClose={onClose}>
//         <div className="cn-modal-header">{args.title}</div>
//         <div className="cn-modal-body">{args.contents}</div>
//         <div className="cn-modal-footer">
//           {args.subBtn ? (
//             <div className="flex gap-3">
//               <Btn category="secondary" outline size="large" width={"100%"} onClick={onClose}>
//                 취소
//               </Btn>
//               <Btn category="primary" size="large" width={"100%"} onClick={() => console.log("확인")}>
//                 확인
//               </Btn>
//             </div>
//           ) : (
//             <Btn category="primary" size="large" width={"100%"} onClick={onClose}>
//               확인
//             </Btn>
//           )}
//         </div>
//       </Modal>
//       <Btn category="primary" size="large" width={120} onClick={() => setIsOpen(true)}>
//         Open Modal
//       </Btn>
//     </>
//   );
// };

// export const Default: Story = {
//   render: (args) => <ModalHook {...args} />,
// };
