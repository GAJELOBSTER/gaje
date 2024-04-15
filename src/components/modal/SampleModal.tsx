"use client";

// Next
import { useTranslation } from "react-i18next";

// Components
import Modal from "@/components/common/Modal";
import Btn from "@/components/common/Btn";

// Hooks
import useModal from "@/hooks/useModal";

// Types
import { IModalProps } from "@/types/commonType";

export default function SampleModal(props: IModalProps) {
  const { t } = useTranslation("common");
  const { isOpen, closeModal, Trigger } = useModal();
  const onClose = () => (props.onClose ? props.onClose() : closeModal());

  return (
    <>
      <Modal isOpen={props.isOpen || isOpen} showCloseBtn size="small" onClose={onClose}>
        <div className="cn-modal-header">{t("modal.sample.title")}</div>
        <div className="cn-modal-body">{t("modal.sample.contents")}</div>
        <div className="cn-modal-footer">
          <Btn category="primary" size="large" width={"100%"} onClick={onClose}>
            {t("ok")}
          </Btn>
        </div>
      </Modal>
      {props.children && <Trigger {...props} />}
    </>
  );
}
