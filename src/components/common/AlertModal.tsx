"use client";

// Next
import { useTranslation } from "react-i18next";

// Components
import Modal from "@/components/common/Modal";
import Btn from "@/components/common/Btn";

// Store
import { useBoundStore } from "@/store";

export type SubBtnType = {
  text: string;
  onClick: () => void;
};

export default function AlertModal() {
  const { t: ct } = useTranslation("common");
  const isOpen = useBoundStore((state) => state.isOpenAlertModal);
  const onClose = useBoundStore((state) => state.closeAlertModal);
  const alertData = useBoundStore((state) => state.alertData);

  return (
    <>
      <Modal isOpen={isOpen} showCloseBtn size="small" onClose={onClose}>
        <div className="cn-modal-header">{alertData.title}</div>
        <div className="cn-modal-body whitespace-pre-line">{alertData.contents}</div>
        <div className="word cn-modal-footer">
          {alertData.subBtn ? (
            <div className="flex gap-3">
              <Btn category="secondary" outline size="large" width={"100%"} onClick={onClose}>
                {ct("cancle")}
              </Btn>
              <Btn category="primary" size="large" width={"100%"} onClick={alertData.subBtn.onClick}>
                {alertData.subBtn.text || ct("ok")}
              </Btn>
            </div>
          ) : (
            <Btn category="primary" size="large" width={"100%"} onClick={onClose}>
              {ct("ok")}
            </Btn>
          )}
        </div>
      </Modal>
    </>
  );
}
