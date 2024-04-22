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
  const { t } = useTranslation("page");
  const { t: ct } = useTranslation("common");

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,32}$/;

  const userLoginId = useInput();
  const userPassword = useInput("", (value: string) => !value || passwordRegex.test(value));

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleClick();
  };

  const handleClick = async () => {
    if (!userLoginId.value) return openAlert(ct("error_message.fail_login"), ct("error_message.required_id"));
    if (!userPassword.value) return openAlert(ct("error_message.fail_login"), ct("error_message.required_password"));
    if (userPassword.error) return openAlert(ct("error_message.fail_login"), ct("error_message.password_rule_error"));

    setIsLoading(true);
    const body = { loginId: userLoginId.value, password: userPassword.value };
    const { status } = await AuthFetch.logIn({ body });
    setIsLoading(false);

    if (status === 500) return openAlert(ct("error_message.fail_login"), ct("error_message.server_error"));
    if (!isSuccessStatus(status)) return openAlert(ct("error_message.fail_login"), ct("error_message.invalid_login"));

    router.push("/main/dashboard");
  };

  return (
    <div className="relative flex-col">
      {isLoading && <Loader />}
      <LocaleSelect className="absolute right-0 top-0" />
      <div className="typo-title1-sb cn-center text-neutral-600">{t("login.title")}</div>
      <div className="typo-body2-sb mt-[60px] w-[400px] text-neutral-400">
        <TextField {...userLoginId} label={t("login.id")} placeholder={t("login.id_placeholder")} size="large" />
        <TextField
          {...userPassword}
          className="mt-6"
          label={t("login.password")}
          placeholder={t("login.password_placeholder")}
          size="large"
          type={isShow ? "text" : "password"}
          onKeyDown={handleKeyDown}
          helperText={userPassword.error ? ct("error_message.password_rule_error_helpertext") : ""}
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
