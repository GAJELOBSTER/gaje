// Components
import Navibar from "@/components/layout/Navibar";

interface IProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: IProps) {
  return (
    <div className="flex min-h-[100vh]">
      <Navibar />
      <div className="w-[calc(100%-260px)] bg-white p-12">{children}</div>
    </div>
  );
}
