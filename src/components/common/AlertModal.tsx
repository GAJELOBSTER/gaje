"use client";

// Components
import Modal from "@/components/common/Modal";
import Btn from "@/components/common/Btn";

type SubBtnType = {
  text: string;
  onClick: () => void;
};
export interface IAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  contents: string;
  subBtn?: SubBtnType;
}

export default function AlertModal(props: IAlertModalProps) {
  return (
    <>
      <Modal isOpen={props.isOpen} showCloseBtn size="small" onClose={props.onClose}>
        <div className="cn-modal-header">{props.title}</div>
        <div className="cn-modal-body whitespace-pre-line">{props.contents}</div>
        <div className="word cn-modal-footer">
          {props.subBtn ? (
            <div className="flex gap-3">
              <Btn category="secondary" outline size="large" width={"100%"} onClick={props.onClose}>
                취소
              </Btn>
              <Btn category="primary" size="large" width={"100%"} onClick={props.subBtn.onClick}>
                {props.subBtn.text || "확인"}
              </Btn>
            </div>
          ) : (
            <Btn category="primary" size="large" width={"100%"} onClick={props.onClose}>
              확인
            </Btn>
          )}
        </div>
      </Modal>
    </>
  );
}
