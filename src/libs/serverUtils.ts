"use server";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { CookieDataType } from "@/types/commonType";

export const getCookieData = (): CookieDataType => {
  const cookieStore = cookies();
  return {
    accessToken: cookieStore.get("accessToken")?.value || "",
    refreshToken: cookieStore.get("refreshToken")?.value || "",
  };
};

// 토큰 만료시 로그아웃 처리
export const logoutOnTokenExpiration = async () => {
  const response = NextResponse.redirect(process.env.NEXT_PUBLIC_NEXT_SERVER || "");
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
};
