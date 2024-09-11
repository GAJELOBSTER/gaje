// Components
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  const navList = [
    {
      title: "nav.home",
      icon: (className: string) => <></>,
      href: "/app/home",
    },
    {
      title: "nav.history",
      icon: (className: string) => <></>,
      href: "/app/history",
    },
    {
      title: "nav.smartword",
      icon: (className: string) => <></>,
      href: "/app/smartword",
    },
    // {
    //   title: "nav.guide",
    //   icon: (className: string) => <GuidIcon className={className} />,
    //   href: "",
    // },
  ];

  return (
    // <div className="cn-center h-full min-h-[100vh] w-full bg-neutral-50">
    //   <div className="container cn-center h-[564px] w-[640px] rounded-[12px] bg-white shadow-[20px_20px_40px_0_rgba(51,51,51,0.05)]">
    //     <LoginForm />
    //   </div>
    // </div>

    <div className="bg-background-gray h-full min-h-[100vh] w-full py-5 pl-5">
      {/* nav 영역 */}
      <div className="bg-background-white rounded-6 h-[100vh] w-[280px] p-9">
        <div>Feed</div>
      </div>
    </div>
  );
}
