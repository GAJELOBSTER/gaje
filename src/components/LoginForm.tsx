"use client";

// React
import { useState } from "react";

// Next
import { useRouter } from "next/navigation";

// Assets
import HidePassword from "@/assets/svg/HidePassword";
import ShowPassword from "@/assets/svg/ShowPassword";

// Components
import Btn from "@/components/common/Btn";

export default function LoginForm() {
  const router = useRouter();

  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isShow, setIsShow] = useState<boolean>(false);

  const inputStyle = `
    typo-body2-m h-10 w-full bg-white pl-5 pr-9 py-4 text-neutral-800 placeholder-neutral-200
    rounded-3 border-1 border-neutral-100 outline-none
    focus:border-2 focus:border-neutral-500
  `;

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
        className={inputStyle}
        placeholder="아이디를 입력해 주세요"
      />
      <div className="typo-body2-r mb-4 mt-6">비밀번호</div>
      <div className="relative">
        <input
          type={isShow ? "text" : "password"}
          value={userPassword}
          onChange={handleUserPasswordChange}
          onKeyDown={handleUserPasswordKeyDown}
          className={inputStyle}
          placeholder="비밀번호를 입력해주세요"
        />
        <div
          className="absolute right-5 top-1/2 h-7 w-7 -translate-y-1/2 cursor-pointer"
          onClick={() => setIsShow(!isShow)}
        >
          {isShow ? <ShowPassword /> : <HidePassword />}
        </div>
      </div>
      <div className="mt-9">
        <Btn category="primary" size="large" onClick={handleClick} width={"400px"}>
          로그인
        </Btn>
      </div>
    </>
  );
}
