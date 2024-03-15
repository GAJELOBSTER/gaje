"use client";

import { useState } from "react";

interface IModalTriggerProps {
  className?: string;
  children?: React.ReactNode;
}

type ModalHookReturnType = {
  isOpen: boolean;
  closeModal: () => void;
  Trigger: (props: IModalTriggerProps) => React.ReactNode;
};

export default function useModal(): ModalHookReturnType {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = () => setIsOpen(false);

  const Trigger = ({ className, children }: IModalTriggerProps) => (
    <div className={`${className} cursor-pointer`}>
      <div onClick={() => setIsOpen(true)}>{children}</div>
    </div>
  );

  return { isOpen, closeModal, Trigger };
}
