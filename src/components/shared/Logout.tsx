"use client";

// Next
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

// Components
import Btn from "@/components/common/Btn";

// Fetch
import { AuthFetch } from "@/fetch/method/authFetch";

// Hooks
import useAlert from "@/hooks/useAlert";

export default function Logout() {
  const router = useRouter();
  const { t } = useTranslation("page");
  const { t: ct } = useTranslation("common");
  const { openAlert } = useAlert();

  const handleClick = async () => {
    const { status } = await AuthFetch.logOut();

    if (status === 500) return openAlert(ct("error_message.fail_logout"), ct("error_message.server_error"));

    router.replace("/");
  };

  return (
    <div>
      <Btn size="small" onClick={handleClick} width={"80px"}>
        {t("logout.logout")}
      </Btn>
    </div>
  );
}
