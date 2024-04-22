"use client";

// React
import { useState } from "react";

// Next
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

// Assets
import HidePassword from "@/assets/svg/HidePassword";
import ShowPassword from "@/assets/svg/ShowPassword";

// Components
import Btn from "@/components/common/Btn";
import TextField from "@/components/common/TextField";
import LocaleSelect from "@/components/shared/LocaleSelect";
import Loader from "@/components/common/Loader";

// Hooks
import useInput from "@/hooks/useInput";

export default function LoginForm() {
  const router = useRouter();
  const userName = useInput();
  const userPassword = useInput();

  const { t } = useTranslation("page");

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleClick();
  };

  const handleClick = async () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/main/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="relative flex-col">
      {isLoading && <Loader />}
      <LocaleSelect className="absolute right-0 top-0" />
      <div className="typo-title1-sb cn-center text-neutral-600">{t("login.title")}</div>
      <div className="typo-body2-sb mt-[60px] w-[400px] text-neutral-400">
        <TextField {...userName} label={t("login.id")} placeholder={t("login.id_placeholder")} size="large" />
        <TextField
          {...userPassword}
          className="mt-6"
          label={t("login.password")}
          placeholder={t("login.password_placeholder")}
          size="large"
          type={isShow ? "text" : "password"}
          onKeyDown={handleKeyDown}
          endIcon={
            <div className="cursor-pointer" onClick={() => setIsShow(!isShow)}>
              {isShow ? <ShowPassword /> : <HidePassword />}
            </div>
          }
        />
        <div className="mt-9">
          <Btn category="primary" size="large" onClick={handleClick} width={"400px"}>
            {t("login.login")}
          </Btn>
        </div>
      </div>
    </div>
  );
}
