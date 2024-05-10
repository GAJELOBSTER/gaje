"use client";

import { getJson } from "@/libs/utils";
import { CookieDataType } from "@/types/commonType";
import { useCookies } from "next-client-cookies";

export const useClientCookie = (): CookieDataType => {
  const cookieStore = useCookies();
  return {
    accessToken: cookieStore.get("accessToken"),
    userInfo: getJson(cookieStore.get("userInfo") || ""),
  };
};
