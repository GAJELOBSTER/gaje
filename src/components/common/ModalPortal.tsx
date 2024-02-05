"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IProps {
  children: ReactNode;
}

export default function ModalPortal(props: IProps) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById("modal"));
  }, []);

  return element ? createPortal(props.children, element) : null;
}
