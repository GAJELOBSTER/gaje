// Next
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

// Components
import LoginForm from "@/components/LoginForm";

interface IProps {
  searchParams: { callbackUrl: string };
}

export default async function LoginPage({ searchParams }: IProps) {
  const session = await getServerSession();
  if (session) redirect(searchParams?.callbackUrl ? searchParams.callbackUrl : "/gaje/dashboard");
  return (
    <div className="cn-center h-full min-h-[100vh] w-full bg-neutral-50">
      <div className="container cn-center h-[402px] w-[560px] rounded-[12px] bg-white shadow-[20px_20px_40px_0_rgba(51,51,51,0.05)]">
        <LoginForm />
      </div>
    </div>
  );
}
