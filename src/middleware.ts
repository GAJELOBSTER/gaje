// Next
import { NextRequest } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "@/i18n/i18nConfig";

// Fetch
import { AuthFetch } from "@/fetch/method/authFetch";

// Libs
import { isSuccessStatus } from "@/libs/utils";
import { logoutOnTokenExpiration, getCookieData } from "@/libs/serverUtils";

const checkPathname = (request: NextRequest, pathname: string) => {
  if (request.nextUrl.pathname.startsWith(`/${pathname}`)) return true;
  return i18nConfig.locales.some((locale) => request.nextUrl.pathname.startsWith(`/${locale}/${pathname}`));
};

export async function middleware(request: NextRequest) {
  // 인증이 필요한 페이지 경로 설정
  if (checkPathname(request, "admin")) {
    const cookieData = getCookieData();
    const accessToken = cookieData.accessToken;
    const refreshToken = cookieData.refreshToken;
    if (!accessToken || !refreshToken) return logoutOnTokenExpiration();

    const healthCheckResponse = await AuthFetch.healthCheck(accessToken);
    if (isSuccessStatus(healthCheckResponse.status)) return i18nRouter(request, i18nConfig);

    const reissueResponse = await AuthFetch.reissueAccessToken(refreshToken);
    if (!isSuccessStatus(reissueResponse.status)) return logoutOnTokenExpiration();

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
