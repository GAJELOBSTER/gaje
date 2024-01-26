import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="cn-center h-full min-h-[100vh] w-full bg-BG">
      <div className="container cn-center h-[616px] w-[710px] flex-col rounded-[12px] bg-white shadow-[20px_20px_40px_0_rgba(51,51,51,0.05)]">
        <div className="text-gray-600 typo-h1">샘플 로그인</div>
        <div className="text-gray-400 typo-title1 mt-10 w-[400px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
