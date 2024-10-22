// "use client";

// // Components
// import Modal from "@/components/common/Modal";
// import Btn from "@/components/common/Btn";

// // Store
// import { useStore } from "@/store";

// export type SubBtnType = {
//   text: string;
//   onClick: () => void;
// };

// export default function AlertModal() {
//   const isOpen = useStore((state) => state.isOpenAlertModal);
//   const onClose = useStore((state) => state.closeAlertModal);
//   const alertData = useStore((state) => state.alertData);

//   return (
//     <>
//       <Modal isOpen={isOpen} showCloseBtn size="small" onClose={onClose}>
//         <div className="cn-modal-header">{alertData.title}</div>
//         <div className="cn-modal-body whitespace-pre-line">{alertData.contents}</div>
//         <div className="word cn-modal-footer">
//           {alertData.subBtn ? (
//             <div className="flex gap-3">
//               <Btn category="secondary" outline size="large" width={"100%"} onClick={onClose}>
//                 취소
//               </Btn>
//               <Btn category="primary" size="large" width={"100%"} onClick={alertData.subBtn.onClick}>
//                 {alertData.subBtn.text || "확인"}
//               </Btn>
//             </div>
//           ) : (
//             <Btn category="primary" size="large" width={"100%"} onClick={onClose}>
//               확인
//             </Btn>
//           )}
//         </div>
//       </Modal>
//     </>
//   );
// }
