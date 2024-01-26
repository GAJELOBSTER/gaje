"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const handleClick = async () => router.push("/sample");

  return (
    <>
      <div className="mb-2">아이디</div>
      <input
        type="text"
        value={userName}
        onChange={handleUserNameChange}
        onKeyDown={handleUserNameKeyDown}
        className="placeholder-gray-200 h-10 w-full rounded-3 border border-gray-100 bg-white pl-4 font-regular outline-none"
        placeholder="아이디를 입력해 주세요"
      />
      <div className="mb-2 mt-5">비밀번호</div>
      <input
        type="password"
        value={userPassword}
        onChange={handleUserPasswordChange}
        onKeyDown={handleUserPasswordKeyDown}
        className="placeholder-gray-200 h-10 w-full rounded-3 border border-gray-100 bg-white pl-4 font-regular outline-none"
        placeholder="비밀번호를 입력해주세요"
      />
      <button className="bg-orange-100 mt-9 h-10 w-full rounded-3 text-white" onClick={handleClick}>
        로그인
      </button>
    </>
  );
}
