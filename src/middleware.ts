import { healthCheck, logoutOnTokenExpiration, reissueAccessToken } from "@/libs/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware() {
  const accessToken = cookies().get("accessToken")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;
  if (!accessToken || !refreshToken) return logoutOnTokenExpiration();

  const healthCheckResponse = await healthCheck(accessToken);
  if (healthCheckResponse.status === 200) return NextResponse.next();

  const reissueResponse = await reissueAccessToken(refreshToken);
  const reissueResult = await reissueResponse.json();
  if (reissueResponse?.status !== 200) return logoutOnTokenExpiration();

  const newAccessToken = reissueResult.accessToken;

  const response = NextResponse.next();
  response.cookies.set("accessToken", newAccessToken);
  return response;
}

export const config = {
  // 인증이 필요한 페이지 경로 설정
  matcher: "/admin/:path*",
};
