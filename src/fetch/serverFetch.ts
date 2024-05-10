"use server";

// Next
import { NextResponse } from "next/server";

// Fetch
import { AuthFetch } from "@/fetch/method/authFetch";

// Libs
import { isSuccessStatus } from "@/libs/utils";
import { logoutOnTokenExpiration, getServerCookie } from "@/libs/serverUtils";

// Types
import { IFetchOption } from "@/types/commonType";

export default async function serverFetch(url: string, options: IFetchOption) {
  const { method, body } = options;

  const baseURL = `${process.env.API_URL}/api/${process.env.API_VERSION}`;
  const fetchURL = `${baseURL}${url}`;

  const cookieData = getServerCookie();
  const accessToken = cookieData.accessToken;
  const refreshToken = cookieData.refreshToken;
  const userInfo = cookieData.userInfo;

  const requestOptions: RequestInit = {
    method: `${method}`,
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  if (!accessToken || !refreshToken || !userInfo) return logoutOnTokenExpiration();

  const originFetchResponse = await fetch(fetchURL, requestOptions);
  const originFetchResult = await originFetchResponse.json();

  // Access Token 만료 시
  if (originFetchResponse.status === 401) {
    const reissueResponse = await AuthFetch.reissueAccessToken(refreshToken);
    const reissueResult = await reissueResponse.json();
    if (!isSuccessStatus(reissueResponse.status)) return logoutOnTokenExpiration();

    const newAccessToken = reissueResult.accessToken;
    const reFetchResponse = await fetch(fetchURL, {
      ...requestOptions,
      headers: { ...requestOptions.headers, Authorization: `Bearer ${newAccessToken}` },
    });
    const reFetchResult = await reFetchResponse.json();

    const nextResponse = NextResponse.json(reFetchResult, { status: reFetchResponse.status });
    nextResponse.cookies.set("accessToken", newAccessToken);
    return nextResponse;
  }

  return NextResponse.json(originFetchResult, { status: originFetchResponse.status });
}
