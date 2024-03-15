"use client";

// Components
import Modal from "@/components/common/Modal";
import Btn from "@/components/common/Btn";

// Hooks
import useModal from "@/hooks/useModal";

// Types
import { IModalProps } from "@/types/commonType";

export default function SampleModal(props: IModalProps) {
  const { isOpen, closeModal, Trigger } = useModal();
  const onClose = () => (props.onClose ? props.onClose() : closeModal());

  return (
    <>
      <Modal isOpen={props.isOpen || isOpen} showCloseBtn size="small" onClose={onClose}>
        <div className="cn-modal-header">Sample Modal</div>
        <div className="cn-modal-body">Body 입니다</div>
        <div className="cn-modal-footer">
          <Btn category="primary" size="large" width={"100%"}>
            Button
          </Btn>
        </div>
      </Modal>
      {props.children && <Trigger {...props} />}
    </>
  );
}
