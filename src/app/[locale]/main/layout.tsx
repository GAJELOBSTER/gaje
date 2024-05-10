// Components
import Navibar from "@/components/layout/Navibar";
import LocaleSelect from "@/components/shared/LocaleSelect";
import Logout from "@/components/shared/Logout";

// Types
import { IPageProps } from "@/types/commonType";

export default function MainLayout(props: Pick<IPageProps, "params" | "children">) {
  return (
    <div className="flex min-h-[100vh]">
      <Navibar locale={props.params.locale} />
      <div className="flex-grow bg-white p-12">
        <div className="relative">
          <div className="absolute -top-9 right-0 flex gap-3">
            <LocaleSelect className="" />
            <Logout />
          </div>{" "}
          {props.children}
        </div>
      </div>
    </div>
  );
}
