import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-neutral-50 cn-center h-full min-h-[100vh] w-full">
      <div className="container cn-center h-[564px] w-[640px] flex-col rounded-[12px] bg-white shadow-[20px_20px_40px_0_rgba(51,51,51,0.05)]">
        <div className="typo-title1-sb text-neutral-600">샘플 로그인</div>
        <div className="typo-body2-sb text-neutral-400 mt-[60px] w-[400px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
