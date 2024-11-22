// Components
import Main from "@/components/Main";
import Navbar from "@/components/layout/Navbar";
import Logout from "@/components/shared/Logout";

// Types
import { IPageProps } from "@/types/commonType";

export default function MainLayout(props: Pick<IPageProps, "children">) {
  return (
    <div className="flex min-h-[100vh] bg-background-gray py-5 pl-5">
      {/* nav 영역 */}
      <Navbar />
      {/* <div className="flex-grow bg-white p-12">
        <div className="relative">
          <div className="absolute -top-9 right-0 flex gap-3">
            <Logout />
          </div>{" "}
          {props.children}
        </div>
      </div> */}

      {/* <div className="h-full min-h-[100vh] w-full bg-background-gray py-5 pl-5">
        <div className="h-[100vh] w-[280px] rounded-6 bg-background-white p-9">
          <div>Feed</div>
        </div>
      </div> */}

      <Main />
    </div>
  );
}
