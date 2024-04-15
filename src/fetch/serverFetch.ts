"use server";

// Next
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Libs
import { isSuccessResponse, logoutOnTokenExpiration, reissueAccessToken } from "@/libs/utils";

export default async function serverFetch(url: string, options: RequestInit) {
  const { method, body } = options;

  const baseURL = `${process.env.API_URL}/api/${process.env.API_VERSION}`;
  const fetchURL = `${baseURL}${url}`;
  const accessToken = cookies().get("accessToken")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;

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

  if (!accessToken || !refreshToken) return logoutOnTokenExpiration();

  const originFetchResponse = await fetch(fetchURL, requestOptions);
  const originFetchResult = await originFetchResponse.json();

  // Access Token 만료 시
  if (originFetchResponse.status === 401) {
    const reissueResponse = await reissueAccessToken(refreshToken);
    const reissueResult = await reissueResponse.json();
    if (!isSuccessResponse(reissueResponse.status)) return logoutOnTokenExpiration();

    const newAccessToken = reissueResult.accessToken;
    const reFetchResponse: any = await fetch(fetchURL, {
      ...requestOptions,
      headers: { ...requestOptions.headers, Authorization: `Bearer ${newAccessToken}` },
    });
    const reFetchResult = await reFetchResponse.json();

    const nextResponse = NextResponse.json(reFetchResult, { status: originFetchResponse.status });
    nextResponse.cookies.set("accessToken", newAccessToken);
    return nextResponse;
  }

  return NextResponse.json(originFetchResult, { status: originFetchResponse.status });
}
