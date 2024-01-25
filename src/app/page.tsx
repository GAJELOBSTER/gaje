import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="cn-center bg-BG h-full min-h-[100vh] w-full">
      <div className="text- cn-center container h-[616px] w-[710px] flex-col rounded-[12px] bg-white text-lg shadow-[20px_20px_40px_0_rgba(51,51,51,0.05)]">
        <div className="typo-h1 text-gray-60">샘플 로그인</div>
        <div className="typo-title1 text-gray-60 mt-10 w-[400px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
