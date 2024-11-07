"use client";

// Next
import { signOut } from "next-auth/react";

// Components
import Btn from "@/components/common/Btn";

export default function Logout() {
  const handleClick = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Btn size="small" width={"80px"} onClick={handleClick}>
      로그아웃
    </Btn>
  );
}
