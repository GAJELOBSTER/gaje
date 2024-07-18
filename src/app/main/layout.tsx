// Components
import Navibar from "@/components/layout/Navibar";
import Logout from "@/components/shared/Logout";

// Types
import { IPageProps } from "@/types/commonType";

export default function MainLayout(props: Pick<IPageProps, "children">) {
  return (
    <div className="flex min-h-[100vh]">
      <Navibar />
      <div className="flex-grow bg-white p-12">
        <div className="relative">
          <div className="absolute -top-9 right-0 flex gap-3">
            <Logout />
          </div>{" "}
          {props.children}
        </div>
      </div>
    </div>
  );
}
