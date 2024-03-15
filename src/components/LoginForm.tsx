"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Btn from "@/components/common/Btn";

export default function LoginForm() {
  const router = useRouter();

  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleUserPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  const handleUserNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleClick();
  };

  const handleUserPasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleClick();
  };

  const handleClick = async () => router.push("/main/dashboard");

  return (
    <>
      <div className="typo-body2-r mb-4">아이디</div>
      <input
        type="text"
        value={userName}
        onChange={handleUserNameChange}
        onKeyDown={handleUserNameKeyDown}
        className="typo-body2-m border-1 border-neutral-100 placeholder-neutral-200 text-neutral-800 h-10 w-full rounded-3 bg-white pl-4 font-regular outline-none"
        placeholder="아이디를 입력해 주세요"
      />
      <div className="typo-body2-r mb-4 mt-6">비밀번호</div>
      <input
        type="password"
        value={userPassword}
        onChange={handleUserPasswordChange}
        onKeyDown={handleUserPasswordKeyDown}
        className="border-1 border-neutral-100 placeholder-neutral-200 text-neutral-800 h-10 w-full rounded-3 bg-white pl-4 font-regular outline-none"
        placeholder="비밀번호를 입력해주세요"
      />
      <div className="mt-9">
        <Btn category="primary" size="large" onClick={handleClick} width={"100%"}>
          로그인
        </Btn>
      </div>
    </>
  );
}
