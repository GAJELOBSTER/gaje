"use client";

// Next
import { useRouter } from "next/navigation";

// Components
import Btn from "@/components/common/Btn";

// Fetch
import { AuthFetch } from "@/fetch/method/authFetch";

// Hooks
import useAlert from "@/hooks/useAlert";

export default function Logout() {
  const router = useRouter();
  const { openAlert } = useAlert();

  const handleClick = async () => {
    const { status } = await AuthFetch.logOut();

    if (status === 500) return openAlert("로그아웃 실패", "서버 에러");

    router.replace("/");
  };

  return (
    <div>
      <Btn size="small" onClick={handleClick} width={"80px"}>
        로그아웃
      </Btn>
    </div>
  );
}
