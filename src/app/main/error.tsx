"use client";

import Btn from "@/components/common/Btn";

interface IErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: IErrorProps) {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-6">
      <div className="typo-title1-sb">문제가 발생하였습니다</div>
      <div>서버에서 알 수 없는 에러가 발생하였습니다. 잠시 후에 다시 시도해주세요</div>
      <Btn width={100} onClick={() => reset()}>
        재시도
      </Btn>
    </main>
  );
}
