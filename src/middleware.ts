// Next
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/" },
});

export const config = {
  // 인증이 필요한 페이지 경로 설정
  matcher: "/gaje/:path*",
};
