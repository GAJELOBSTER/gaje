// Next
import { useTranslation } from "@/i18n";

// Components
import LoginForm from "@/components/LoginForm";

// Types
import { IPageProps } from "@/types/commonType";

export default async function LoginPage(props: IPageProps) {
  const { t } = await useTranslation(props.params.locale, "page");
  return (
    <div className="cn-center h-full min-h-[100vh] w-full bg-neutral-50">
      <div className="container cn-center h-[564px] w-[640px] rounded-[12px] bg-white shadow-[20px_20px_40px_0_rgba(51,51,51,0.05)]">
        <LoginForm />
      </div>
    </div>
  );
}
