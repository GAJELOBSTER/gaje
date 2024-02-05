"use client";

// Components
import Modal from "@/components/common/Modal";
import Btn from "../common/Btn";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export default function SampleModal(props: IProps) {
  return (
    <Modal showCloseBtn size="medium" trigger={props.children} triggerClassName={props.className}>
      <div className="cn-modal-header">Sample Modal</div>
      <div className="cn-modal-body">Body 입니다</div>
      <div className="cn-modal-footer">
        <Btn category="primary" size="medium" width={"100%"}>
          Button
        </Btn>
      </div>
    </Modal>
  );
}
