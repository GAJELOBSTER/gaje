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
import TextField from "@/components/common/TextField";
import Loader from "@/components/common/Loader";

// Fetch
import { AuthFetch } from "@/fetch/method/authFetch";

// Hooks
import useInput from "@/hooks/useInput";
import useAlert from "@/hooks/useAlert";

// Libs
import { isSuccessStatus } from "@/libs/utils";

export default function LoginForm() {
  const router = useRouter();
  const { openAlert } = useAlert();

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,32}$/;

  const userLoginId = useInput();
  const userPassword = useInput("", (value: string) => !value || passwordRegex.test(value));

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleClick();
  };

  const handleClick = async () => {
    // 로그인 API 요청 하지 않도록 초기 설정
    return router.push("/main/dashboard");

    const failAlertTitle = "로그인 실패";
    if (!userLoginId.value) return openAlert(failAlertTitle, "아이디를 입력해 주세요");
    if (!userPassword.value) return openAlert(failAlertTitle, "비밀번호를 입력해 주세요");
    if (userPassword.error) return openAlert(failAlertTitle, "비밀번호 형식이 올바르지 않습니다");

    setIsLoading(true);
    const body = { loginId: userLoginId.value, password: userPassword.value };
    const { status } = await AuthFetch.logIn({ body });
    setIsLoading(false);

    if (status === 500)
      return openAlert(failAlertTitle, "서버에서 알 수 없는 에러가 발생하였습니다. 잠시 후에 다시 시도해주세요");
    if (!isSuccessStatus(status)) return openAlert(failAlertTitle, "로그인 정보가 올바르지 않습니다");

    router.push("/main/dashboard");
  };

  return (
    <div className="relative flex-col">
      {isLoading && <Loader />}
      <div className="typo-title1-sb cn-center text-neutral-600">로그인</div>
      <div className="typo-body2-sb mt-[60px] w-[400px] text-neutral-400">
        <TextField {...userLoginId} label={"아이디"} placeholder={"아이디를 입력해 주세요"} size="large" />
        <TextField
          {...userPassword}
          className="mt-6"
          label={"비밀번호"}
          placeholder={"비밀번호를 입력해 주세요"}
          size="large"
          type={isShow ? "text" : "password"}
          onKeyDown={handleKeyDown}
          helperText={
            userPassword.error
              ? "비밀번호는 8-32자여야 하며, 적어도 하나의 영문자, 하나의 숫자, 하나의 특수문자를 포함해야 합니다"
              : ""
          }
          endIcon={
            <div className="cursor-pointer" onClick={() => setIsShow(!isShow)}>
              {isShow ? <ShowPassword /> : <HidePassword />}
            </div>
          }
        />
        <div className="mt-9">
          <Btn category="primary" size="large" onClick={handleClick} width={"400px"}>
            로그인
          </Btn>
        </div>
      </div>
    </div>
  );
}
