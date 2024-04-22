// Components
import Navibar from "@/components/layout/Navibar";
import LocaleSelect from "@/components/shared/LocaleSelect";

// Types
import { IPageProps } from "@/types/commonType";

export default function MainLayout(props: Pick<IPageProps, "params" | "children">) {
  return (
    <div className="flex min-h-[100vh]">
      <Navibar locale={props.params.locale} />
      <div className="flex-grow bg-white p-12">
        <LocaleSelect className="absolute right-6 top-6" />
        {props.children}
      </div>
    </div>
  );
}
