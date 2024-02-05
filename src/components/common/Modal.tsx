"use client";

// React
import { useEffect, useState } from "react";

// Next
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

// Assets
import CloseIcon from "@/assets/svg/CloseIcon";

// Components
import ModalPortal from "./ModalPortal";

type ModalSizeType = "small" | "medium";

interface IProps {
  /** 모달 컨텐츠 */
  children: React.ReactNode;
  /** 모달 사이즈 */
  size: ModalSizeType;
  /** 모달 여는 트리거(버튼) */
  trigger: React.ReactNode;
  /** 모달 트리거 영역 ClassName */
  triggerClassName?: string;
  /** 우측 상단 Close 버튼 유무 */
  showCloseBtn?: boolean;
}

export default function Modal(props: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const params = new URLSearchParams(searchParams);
  const [queryString, setQueryString] = useState<string>("");

  const modalSize: Record<ModalSizeType, string> = {
    small: "w-[400px]",
    medium: "w-[560px]",
  };

  const isOpenModal = params.get(queryString);

  useEffect(() => {
    const hash = Math.random().toString(36).substring(2, 11);
    setQueryString(`modal_${hash}`);

    // 초기 렌더링 시 modal_로 시작하는 파라미터 삭제
    params
      .toString()
      .split("&")
      .filter((param) => param.substring(0, 6) === "modal_")
      .forEach((modalParam) => params.delete(modalParam.split("=")[0]));

    router.replace(`${pathName}?${params.toString()}`);
  }, []);

  const closeModal = () => router.back();

  return (
    <>
      {isOpenModal && (
        <ModalPortal>
          <div className="absolute left-0 top-0 h-full w-full bg-black opacity-70" onClick={closeModal}></div>
          <div
            className={`${modalSize[props.size]} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-4 bg-white`}
          >
            {props.children}
            {props.showCloseBtn && (
              <div className="absolute right-6 top-6 cursor-pointer" onClick={closeModal}>
                <CloseIcon />
              </div>
            )}
          </div>
        </ModalPortal>
      )}
      <div className={props.triggerClassName}>
        <Link href={`${pathName}?${params.toString()}&${queryString}=true`}>{props.trigger}</Link>
      </div>
    </>
  );
}
