import { IRequestInit } from "@/fetch/clientFetch";
import customFetch from "@/fetch/customFetch";

type PayloadType = {
  params?: string;
  options?: IRequestInit;
  id?: string;
};

const getSampleList = async (payload?: PayloadType) =>
  await customFetch("/sample", { ...payload?.options, method: "GET" });

export const FolderFetch = {
  getSampleList,
};
