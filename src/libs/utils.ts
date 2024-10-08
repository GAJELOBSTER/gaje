import { SearchParamsType } from "@/types/commonType";
import { JwtPayload, jwtDecode } from "jwt-decode";

type JwtTokenType = JwtPayload & { roleId: number };

export const isSuccessStatus = (statusCode: number | undefined) => statusCode === 200 || statusCode === 201;

export const formatDate = (isoDateString: Date) => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const convertQueryString = (query: SearchParamsType) => {
  return Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};

export const getJson = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
};

export const checkRoleId = (accessToken = "") => {
  const { roleId } = jwtDecode<JwtTokenType>(accessToken);

  return roleId;
};

export const checkLowerRole = (accessToken = "", roleLevel: number) => {
  const roleId = checkRoleId(accessToken);

  return roleId ? roleLevel <= roleId : true;
};
