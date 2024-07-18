// Next
import { NextResponse } from "next/server";

// Fetch
import { AuthFetch } from "@/fetch/method/authFetch";

// Libs
import { isSuccessStatus } from "@/libs/utils";
import { logoutOnTokenExpiration, getCookieData } from "@/libs/serverUtils";

export async function middleware() {
  const cookieData = getCookieData();
  const accessToken = cookieData.accessToken;
  const refreshToken = cookieData.refreshToken;
  if (!accessToken || !refreshToken) return logoutOnTokenExpiration();

  const healthCheckResponse = await AuthFetch.healthCheck(accessToken);
  if (isSuccessStatus(healthCheckResponse.status)) return NextResponse.next();

  const reissueResponse = await AuthFetch.reissueAccessToken(refreshToken);
  if (!isSuccessStatus(reissueResponse.status)) return logoutOnTokenExpiration();

  const reissueResult = await reissueResponse.json();
  const newAccessToken = reissueResult.accessToken;

  const response = NextResponse.next();
  response.cookies.set("accessToken", newAccessToken);
  return response;
}

export const config = {
  // 인증이 필요한 페이지 경로 설정
  matcher: "/gaje/:path*",
};
