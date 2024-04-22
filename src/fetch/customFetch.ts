import clientFetch from "@/fetch/clientFetch";
import serverFetch from "@/fetch/serverFetch";
import { IFetchOption } from "@/types/commonType";

export default function customFetch(apiUrl: string, options: IFetchOption) {
  const isServer = typeof window === "undefined";
  return isServer ? serverFetch(apiUrl, options) : clientFetch(apiUrl, options);
}
