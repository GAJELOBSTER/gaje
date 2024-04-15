// Next
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "@/i18n/i18nConfig";

import { healthCheck, logoutOnTokenExpiration, reissueAccessToken, isSuccessResponse } from "@/libs/utils";

const checkPathname = (request: NextRequest, pathname: string) => {
  if (request.nextUrl.pathname.startsWith(`/${pathname}`)) return true;
  return i18nConfig.locales.some((locale) => request.nextUrl.pathname.startsWith(`/${locale}/${pathname}`));
};

export async function middleware(request: NextRequest) {
  // 인증이 필요한 페이지 경로 설정
  if (checkPathname(request, "admin")) {
    const accessToken = cookies().get("accessToken")?.value;
    const refreshToken = cookies().get("refreshToken")?.value;
    if (!accessToken || !refreshToken) return logoutOnTokenExpiration();

    const healthCheckResponse = await healthCheck(accessToken);
    if (isSuccessResponse(healthCheckResponse.status)) return i18nRouter(request, i18nConfig);

    const reissueResponse = await reissueAccessToken(refreshToken);
    if (!isSuccessResponse(reissueResponse.status)) return logoutOnTokenExpiration();

    const reissueResult = await reissueResponse.json();
    const newAccessToken = reissueResult.accessToken;

    const response = i18nRouter(request, i18nConfig);
    response.cookies.set("accessToken", newAccessToken);
    return response;
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
