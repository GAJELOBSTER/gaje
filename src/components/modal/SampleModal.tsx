"use client";

// Components
import Modal from "@/components/common/Modal";
import Btn from "@/components/common/Btn";

// Hooks
import useModal from "@/hooks/useModal";

// Types
import { IModalProps } from "@/types/commonType";

// 사용 예시
// import SampleModal from "@/components/modal/SampleModal";
// import Btn from "@/components/common/Btn";
//
// <SampleModal className="mt-5">
//   <Btn outline size="medium" width={120} category="primary">
//     Test
//   </Btn>
// </SampleModal>;

export default function SampleModal(props: IModalProps) {
  const { isOpen, closeModal, Trigger } = useModal();
  const onClose = () => (props.onClose ? props.onClose() : closeModal());

  return (
    <>
      <Modal isOpen={props.isOpen || isOpen} showCloseBtn size="small" onClose={onClose}>
        <div className="cn-modal-header">샘플 모달</div>
        <div className="cn-modal-body">내용...</div>
        <div className="cn-modal-footer">
          <Btn category="primary" size="large" width={"100%"} onClick={onClose}>
            확인
          </Btn>
        </div>
      </Modal>
      {props.children && <Trigger {...props} />}
    </>
  );
}
