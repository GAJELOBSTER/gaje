"use client";

import { useTranslation } from "react-i18next";
import Btn from "@/components/common/Btn";

interface IErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: IErrorProps) {
  const { t: ct } = useTranslation("common");
  return (
    <main className="flex h-full flex-col items-center justify-center gap-6">
      <div className="typo-title1-sb">{ct("error_message.server_error_title")}</div>
      <div>{ct("error_message.server_error")}</div>
      <Btn width={100} onClick={() => reset()}>
        {ct("try_again")}
      </Btn>
    </main>
  );
}
