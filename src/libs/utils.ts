import { NextResponse } from "next/server";

const baseURL = `${process.env.API_URL}/api/${process.env.API_VERSION}`;

export const isSuccessResponse = (statusCode: number) => statusCode === 200 || statusCode === 201;

// 토큰 만료시 로그아웃 처리
export const logoutOnTokenExpiration = async () => {
  const response = NextResponse.redirect(process.env.NEXT_PUBLIC_NEXT_SERVER || "");
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
};

// refreshToken으로 신규 accessToken 재발급 요청
export const reissueAccessToken = async (refreshToken: string) => {
  return await fetch(`${baseURL}/auth/refreshToken`, {
    method: "POST",
    body: JSON.stringify({
      refreshToken,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 토큰 유효성 체크
export const healthCheck = async (token: string) => {
  return await fetch(`${baseURL}/auth/verifyToken`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
