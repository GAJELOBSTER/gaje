import clientFetch, { IRequestInit } from "@/fetch/clientFetch";
import serverFetch from "@/fetch/serverFetch";

export default function customFetch(apiUrl: string, options: IRequestInit) {
  const isServer = typeof window === "undefined";
  return isServer ? serverFetch(apiUrl, options) : clientFetch(apiUrl, options);
}
