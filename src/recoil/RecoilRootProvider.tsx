"use client";

import { RecoilRoot } from "recoil";

interface IProps {
  children: React.ReactNode;
}

export default function RecoilRootProvider({ children }: IProps) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
