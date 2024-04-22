import customFetch from "@/fetch/customFetch";

const getSampleList = async () => await customFetch("/sample", { method: "GET" });

export const SampleFetch = {
  getSampleList,
};
